import { selectors } from '../../support/selectors';
import { initializeTestSetup, verifyConstructorItems, cleanTestEnvironment } from '../../support/helpers';

describe('Добавление ингредиентов', () => {
  beforeEach(initializeTestSetup);
  afterEach(cleanTestEnvironment);

  it('Счетчик увеличивается при добавлении', () => {
    cy.get(selectors.mainComponent).children('button').click();
    cy.get(selectors.mainComponent).find('.counter__num').contains('1');
  });

  describe('Комбинации различных ингредиентов', () => {
    it('Добавление булки и начинки', () => {
      cy.get(selectors.bunComponent).children('button').click();
      cy.get(selectors.mainComponent).children('button').click();
      verifyConstructorItems(
        'Краторная булка N-200i',
        'Мясо бессмертных моллюсков Protostomia',
        'Краторная булка N-200i'
      );
    });

    it('Добавление соуса к другим ингредиентам', () => {
      cy.get(selectors.bunComponent).children('button').click();
      cy.get(selectors.mainComponent).children('button').click();
      cy.get(selectors.sauceComponent).children('button').click();
      verifyConstructorItems(
        'Краторная булка N-200i',
        'Мясо бессмертных моллюсков Protostomia',
        'Краторная булка N-200i'
      );
      cy.get(selectors.constructorSection).should('contain', 'Соус фирменный Space Sauce');
    });

    it('Изменение булки после добавления начинки', () => {
      cy.get(selectors.mainComponent).children('button').click();
      cy.get(selectors.bunComponent).children('button').click();
      verifyConstructorItems(
        'Краторная булка N-200i',
        'Мясо бессмертных моллюсков Protostomia',
        'Краторная булка N-200i'
      );
    });

    describe('Изменение выбранной булки', () => {
      it('Смена булки без ингредиентов', () => {
        cy.get(selectors.bunComponent).children('button').click();
        verifyConstructorItems(
          'Краторная булка N-200i',
          '',
          'Краторная булка N-200i'
        );
        cy.get(selectors.alternativeBun).children('button').click();
        verifyConstructorItems(
          'Флюоресцентная булка R2-D3',
          '',
          'Флюоресцентная булка R2-D3'
        );
      });

      it('Смена булки с добавленными начинками', () => {
        cy.get(selectors.bunComponent).children('button').click();
        cy.get(selectors.mainComponent).children('button').click();
        cy.get(selectors.alternativeBun).children('button').click();
        verifyConstructorItems(
          'Флюоресцентная булка R2-D3',
          'Мясо бессмертных моллюсков Protostomia',
          'Флюоресцентная булка R2-D3'
        );
      });
    });
  });
});
