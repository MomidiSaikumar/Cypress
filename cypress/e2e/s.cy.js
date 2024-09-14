describe('Target Homepage Test', () => {
  it('should load the Target homepage', () => {
    // Visit the Target homepage
    cy.visit('https://www.target.com/');

    // Check if the homepage has loaded by asserting the presence of specific elements
    cy.url().should('include', 'target.com');
    cy.get('body').should('be.visible'); // Ensure that the body is visible
  });

  describe('Target Product Details Validation', () => {
    it('Validate that the Bose Ultra Open-Ear True Wireless Bluetooth Open Earbuds detail page displays accurate information', () => {
      // Visit the Target homepage
      cy.visit('https://www.target.com/');
  
      // Search for the Bose Ultra Open-Ear True Wireless Bluetooth Open Earbuds
      cy.get('[data-test="@web/Search/SearchInput"]').type('Bose Ultra Open-Ear True Wireless Bluetooth Open Earbuds{enter}');
      
      // Click on the specific product (assuming the product link contains 'Bose Ultra Open-Ear True Wireless Bluetooth Open Earbuds')
      cy.contains('Bose Ultra Open-Ear True Wireless Bluetooth Open Earbuds').click();      
      // Validate the product title
      cy.get('h1').should('contain', 'Bose Ultra Open-Ear True Wireless Bluetooth Open Earbuds');
      
      // Validate the product brand (if available on the page; you might need to adjust the selector based on actual website content)
      cy.get('a[data-test="product-brand"]').should('contain', 'Bose');
  
      // Validate the price (adjust the selector based on actual website content)
      cy.get('span[data-test="product-price"]').should('exist');
  
      // Validate the product description (adjust the selector based on actual website content)
      cy.get('div[data-test="product-description"]').should('exist');
    });
  });
  
  
});
