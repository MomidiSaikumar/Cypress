// Navigate to the homepage
Cypress.Commands.add('visitHomepage', () => {
  cy.visit('https://demowebshop.tricentis.com/');
});

// Search for a product and select it from the search results
Cypress.Commands.add('searchForProduct', (productName) => {
  cy.get('#small-searchterms').type(`${productName}{enter}`);
  cy.get('.product-item > .picture > a > img').click();
});

// Verify product details
Cypress.Commands.add('verifyProductDetails', (productName, price, imgSelector) => {
  cy.get("h1[itemprop='name']").should('contain.text', productName);
  cy.get(imgSelector).should('be.visible');
  cy.get(".price-value").should('contain.text', price);
});

// Login
Cypress.Commands.add('login', (email, password) => {
  cy.get('.ico-login').click();
  cy.get('#Email').type(email);
  cy.get('#Password').type(password);
  cy.get('form > .buttons > .button-1').click();
});

// Add product to cart
Cypress.Commands.add('addProductToCart', (productSelector, buttonSelector) => {
  cy.get(productSelector).click();
  cy.get(buttonSelector).click();
});

// Go to cart and verify items
Cypress.Commands.add('verifyCartItems', (expectedCount) => {
  cy.get('.ico-cart > .cart-label').click();
  cy.get('.product-picture').should('have.length', expectedCount);
});

// Fill out checkout form
Cypress.Commands.add('fillCheckoutForm', (addressDetails) => {
  cy.get('#billing-address-select').select(addressDetails.billingAddress);
  cy.get('#BillingNewAddress_Company').type(addressDetails.company);
  cy.get('#BillingNewAddress_CountryId').select(addressDetails.country);
  cy.get('#BillingNewAddress_City').type(addressDetails.city);
  cy.get('#BillingNewAddress_Address1').type(addressDetails.address1);
  cy.get('#BillingNewAddress_Address2').type(addressDetails.address2);
  cy.get('#BillingNewAddress_ZipPostalCode').type(addressDetails.zipCode);
  cy.get('#BillingNewAddress_PhoneNumber').type(addressDetails.phone);
  cy.get('#BillingNewAddress_FaxNumber').type(addressDetails.fax);
});
