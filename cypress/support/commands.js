// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



// Custom command for searching for a product and adding it to the cart
Cypress.Commands.add('searchAndAddToCart', (productName, buttonId) => {
    cy.get('#small-searchterms').type(`${productName}{enter}`);
    cy.get(`img[title='Show details for ${productName}']`).click();
    cy.get(`#add-to-cart-button-${buttonId}`).click();
  });
  
  // Custom command for checking if the cart is visible and clicking it
  Cypress.Commands.add('openCart', () => {
    cy.get('.ico-cart > .cart-label').should('be.visible').click();
  });

  // cypress/support/commands.js

// Custom command for logging in
Cypress.Commands.add('login', (email, password) => {
    cy.get('.ico-login').click();
    cy.get('#Email').type(email);
    cy.get('#Password').type(password);
    cy.get('form > .buttons > .button-1').click();
  });
  
  // Custom command for checking login error
  Cypress.Commands.add('checkLoginError', () => {
    cy.get('.validation-summary-errors').should('be.visible');
  });


  
  
