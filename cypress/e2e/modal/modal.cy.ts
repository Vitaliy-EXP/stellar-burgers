import { selectors } from '../../support/selectors';
import { initializeTestSetup, cleanTestEnvironment } from '../../support/helpers';

describe('Тест модальных окон', () => {
  beforeEach(initializeTestSetup);
  afterEach(cleanTestEnvironment);

  it('Открытие', () => {
    cy.get(selectors.modalComponent).should('not.exist');
    cy.get(selectors.bunComponent).click();
    cy.get(selectors.modalComponent).should('be.visible');
    cy.get(selectors.modalComponent).within(() => {
      cy.contains('Краторная булка N-200i').should('be.visible');
    });
  });
  
  it('Закрытие окна по нажанию на крестик', () => {
    cy.get(selectors.mainComponent).click();
    cy.get(selectors.modalComponent).should('be.visible');
    cy.get(selectors.modalCloseBtn).click();
    cy.get(selectors.modalComponent).should('not.exist');
  });
  
  it('Закрытие модального окна по клику на оверлей', () => {
    cy.get(selectors.alternativeBun).click();
    cy.get(selectors.modalComponent).should('be.visible');
    cy.get(selectors.modalBackdrop).click({ force: true });
    cy.get(selectors.modalComponent).should('not.exist');
  });
});
