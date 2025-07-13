import { selectors } from '../../support/selectors';
import { initializeTestSetup, verifyConstructorItems, cleanTestEnvironment } from '../../support/helpers';

describe('Оформления заказа', () => {
  beforeEach(initializeTestSetup);
  afterEach(cleanTestEnvironment);

  it('Весь процесс создания и подтверждения заказа', () => {
    cy.get(selectors.bunComponent).children('button').click();
    cy.get(selectors.mainComponent).children('button').click();
    verifyConstructorItems(
      'Краторная булка N-200i',
      'Мясо бессмертных моллюсков Protostomia',
      'Краторная булка N-200i'
    );
    
    cy.get(selectors.orderSubmitBtn).click();
    cy.wait('@createOrder');
    cy.get(selectors.modalComponent, { timeout: 160000 }).should('be.visible');
    cy.get(selectors.orderNumberDisplay).should('contain', '1');
    cy.get(selectors.modalCloseBtn).click();
    cy.get(selectors.modalComponent).should('not.exist');

    cy.get(selectors.constructorSection).should('exist');
    cy.get(selectors.constructorSection).should(
      'not.contain',
      'Краторная булка N-200i'
    );
    cy.get(selectors.constructorSection).should(
      'not.contain',
      'Мясо бессмертных моллюсков Protostomia'
    );
  });
});
