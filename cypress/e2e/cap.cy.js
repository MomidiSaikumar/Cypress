describe('Cart Management', () => {  
  beforeEach(() => {
    // Visit the homepage for all test cases
    cy.visit('https://demowebshop.tricentis.com/');
  });

  // Cart Management
  // 4.1 Add items to the cart
  it("Add items to the cart", () => {
    cy.searchAndAddToCart("Black & White Diamond Heart", 14); // Add Product 2
    cy.searchAndAddToCart("Smartphone", 43);                // Add Product 3
    cy.searchAndAddToCart("14.1-inch Laptop", 31);          // Add Product 4
    cy.openCart();                                          // Open the cart
  });
});

describe('User Login/Logout', () => {  
  beforeEach(() => {
    // Visit the homepage for all test cases
    cy.visit('https://demowebshop.tricentis.com/');
  });

  // Test login functionality with valid credentials
  it('Login functionality with valid credentials', () => {
    cy.login('saikumarmomidi17@gmail.com', 'Sai@1432');
    // You can add further assertions here to verify successful login, e.g.,
    // cy.get('.account').should('contain', 'saikumarmomidi17');
  });

  // Test login functionality with invalid credentials
  it('Login functionality with invalid credentials', () => {
    cy.login('saikumarmomidi17@gmail.com', 'sai@1432'); // Incorrect password
    cy.checkLoginError();
  });
});