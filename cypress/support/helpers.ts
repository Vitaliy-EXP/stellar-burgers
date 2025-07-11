import { selectors } from './selectors';

export const initializeTestSetup = () => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('ingredientsData');
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as('login');
  cy.intercept('POST', 'api/auth/token', { fixture: 'login.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
  
  window.localStorage.setItem('refreshToken', 'test-refresh-token');
  cy.setCookie('accessToken', 'test-access-token');
  
  cy.visit('/');
  cy.viewport(1920, 1080);
  cy.wait('@ingredientsData');
};

export const verifyConstructorItems = (
  topElement: string,
  middleElement: string,
  bottomElement: string
) => {
  cy.get(selectors.constructorSection).should('contain', topElement);
  if (middleElement) {
    cy.get(selectors.constructorSection).should('contain', middleElement);
  }
  cy.get(selectors.constructorSection).should('contain', bottomElement);
};

export const cleanTestEnvironment = () => {
  window.localStorage.removeItem('refreshToken');
  cy.clearCookie('accessToken');
};
