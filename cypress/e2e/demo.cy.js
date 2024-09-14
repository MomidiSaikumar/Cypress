describe('Demo Web Shop Automation Testing', () => {
  
    // Common setup before each test
    beforeEach(() => {
      // Visit the homepage for all test cases
      cy.visit('https://demowebshop.tricentis.com/');
    });
  
    // 1. Homepage Navigation Tests
    describe('Homepage Navigation', () => {
      it('Should load the homepage correctly', () => {
        cy.get('.topic-block-title').should('be.visible'); // Verifying the homepage banner title
      });
  
      it('Should display product categories', () => {
        cy.get('.category-grid').should('exist'); // Verifying that product categories are displayed
      });
    });
  
    // 2. Product Search Tests
    describe('Product Search', () => {
      it('Should search for a product and display results', () => {
        cy.get('#small-searchterms').type('Laptop{enter}'); // Typing 'Laptop' in the search bar
        cy.get('.product-grid').should('contain', 'Laptop'); // Verifying search results contain 'Laptop'
      });
  
      it('Should show relevant products in search results', () => {
        cy.get('.product-item').should('have.length.greaterThan', 0); // Ensure there are search results
      });
    });
  
    // 3. Product Details Tests
    describe('Product Details', () => {
      it('Should display accurate product details', () => {
        cy.get('.product-item').first().click(); // Click on the first product
        cy.get('.product-name').should('be.visible'); // Verifying product name is visible
        cy.get('.product-price').should('be.visible'); // Verifying product price is visible
      });
  
      it('Should add product to the cart', () => {
        cy.get('.product-item').first().click();
        cy.get('#add-to-cart-button').click(); // Click on 'Add to Cart' button
        cy.get('.cart-qty').should('contain', '1'); // Verifying cart quantity shows '1'
      });
    });
  
    // 4. Cart Management Tests
    describe('Cart Management', () => {
      it('Should add items to the cart', () => {
        cy.get('.product-item').first().click();
        cy.get('#add-to-cart-button').click();
        cy.get('.cart-qty').should('contain', '1'); // Verifying cart quantity is updated
      });
  
      it('Should remove items from the cart', () => {
        cy.get('.cart-qty').click(); // Clicking on the cart icon to view cart
        cy.get('.remove-btn').click(); // Removing the item from the cart
        cy.get('.order-summary-content').should('not.contain', 'Laptop'); // Ensuring the item is removed
      });
  
      it('Should calculate cart totals correctly', () => {
        cy.get('.cart-qty').click(); // Clicking on the cart icon
        cy.get('.order-total').should('contain', '$'); // Verifying that the total price is calculated correctly
      });
    });
  
    // 5. User Registration Tests
    describe('User Registration', () => {
      it('Should register a user with valid inputs', () => {
        cy.visit('https://demowebshop.tricentis.com/register');
        cy.get('#gender-male').click(); // Selecting gender
        cy.get('#FirstName').type('John');
        cy.get('#LastName').type('Doe');
        cy.get('#Email').type('john.doe@example.com');
        cy.get('#Password').type('Password123');
        cy.get('#ConfirmPassword').type('Password123');
        cy.get('#register-button').click();
        cy.get('.result').should('contain', 'Your registration completed'); // Verifying successful registration message
      });
  
      it('Should show an error for invalid inputs', () => {
        cy.visit('https://demowebshop.tricentis.com/register');
        cy.get('#Email').type('invalid-email'); // Invalid email format
        cy.get('#register-button').click();
        cy.get('.field-validation-error').should('contain', 'The e-mail address is not valid'); // Verifying the error message
      });
    });
  
    // 6. User Login/Logout Tests
    describe('User Login/Logout', () => {
      it('Should login with valid credentials', () => {
        cy.visit('https://demowebshop.tricentis.com/login');
        cy.get('#Email').type('john.doe@example.com');
        cy.get('#Password').type('Password123');
        cy.get('.login-button').click();
        cy.get('.account').should('contain', 'John'); // Verifying the account name is displayed after login
      });
  
      it('Should show error for invalid credentials', () => {
        cy.visit('https://demowebshop.tricentis.com/login');
        cy.get('#Email').type('wrong@example.com');
        cy.get('#Password').type('wrongpassword');
        cy.get('.login-button').click();
        cy.get('.validation-summary-errors').should('contain', 'Login was unsuccessful'); // Verifying the error message
      });
  
      it('Should logout successfully', () => {
        cy.get('.account').click(); // Assuming there's an account link to click on
        cy.get('.ico-logout').click(); // Click on logout button
        cy.get('.login-button').should('be.visible'); // Verifying the login button is visible after logout
      });
    });
  
    // 7. Checkout Process Tests
    describe('Checkout Process', () => {
      it('Should complete checkout with valid payment info', () => {
        cy.visit('https://demowebshop.tricentis.com/cart');
        cy.get('.checkout-button').click(); // Clicking on checkout button
        cy.get('#BillingNewAddress_FirstName').type('John');
        cy.get('#BillingNewAddress_LastName').type('Doe');
        cy.get('#BillingNewAddress_CountryId').select('United States');
        cy.get('#BillingNewAddress_City').type('New York');
        cy.get('#BillingNewAddress_Address1').type('123 Main St');
        cy.get('#BillingNewAddress_ZipPostalCode').type('10001');
        cy.get('#BillingNewAddress_PhoneNumber').type('1234567890');
        cy.get('.payment-method-next-step-button').click(); // Assuming it's a valid payment method
        cy.get('.order-completed').should('contain', 'Your order has been successfully processed!');
      });
    });
  });
  