describe('Demo Web Shop Automation Testing', () => {
  describe('Homepage Navigation', () => {
  
    // Common setup before each test
    beforeEach(() => {
      // Visit the homepage for all test cases
      cy.visit('https://demowebshop.tricentis.com/');
    });
  
    // 1.1 Homepage Navigation Tests
  
    // Test to verify that the homepage loads correctly
    it('Should load the homepage correctly', () => {
      // Check if the homepage banner is visible
      cy.get('img[alt="Tricentis Demo Web Shop"]').should('be.visible');
      
      // Verify the URL is correct
      cy.url().should('eq', 'https://demowebshop.tricentis.com/');
      cy.url().should('include', 'demowebshop');
      
      // Verify the page title contains 'Demo Web Shop'
      cy.title().should('include', 'Demo Web Shop');
    });
  
    // Test to check that product categories are displayed
    it('Should display product categories', () => {
      // Check if the product categories block title is visible
      cy.get("div.block.block-category-navigation div.title").should('be.visible');
      
      // Verify that the center section of the page is visible
      cy.get('.center-3').should('be.visible');
      
      // Wait for 2 seconds to ensure all elements are loaded properly (could be optimized)
      cy.wait(2000);
      
      // Find and scroll to the footer menu wrapper
      cy.get('.footer-menu-wrapper').scrollIntoView({ duration: 2000 });
    });
  });

  describe('Product Search', () => {
    beforeEach(() => {
      // Visit the homepage for all test cases
      cy.visit('https://demowebshop.tricentis.com/');
    });
  
    // 2.1 Product Search Tests
    // Test the search functionality for various product queries
    it('Should search for a product and display results', () => {
      cy.get('#small-searchterms').type('Desktop PC with CDRW{enter}'); // Typing the product name in the search bar
      cy.get('.picture > a > img').click();
      cy.go(-2); // Navigate back to the previous pages
      
      cy.get('#small-searchterms').type('Smartphone{enter}');
      cy.get('.picture > a > img').click();
      cy.go(-2); // Navigate back to the previous pages
  
      cy.get('#small-searchterms').type('Computing and Internet{enter}');
      cy.get(':nth-child(1) > .product-item > .details > .product-title > a').click();
    });
  
    // 2.2 Verify search results
    it('Should display relevant search results and validate basic product details', () => {
      // Search for "Smartphone"
      cy.get('#small-searchterms').type('Smartphone{enter}');
      
      // Verify that search results are displayed
      cy.get('.product-item').should('have.length.greaterThan', 0); // Ensure that there are search results
  
      // Check that the first result contains "Smartphone" in the title
      cy.get('.product-item').first().within(() => {
        cy.get('.product-title').should('contain.text', 'Smartphone'); // Ensure the product title contains "Smartphone"
        cy.get('.picture > a > img').should('be.visible'); // Verify that the product image is visible
      });
  
      // Click on the first search result
      cy.get('.product-item').first().click();
      
      // Optionally, you could verify the product page details if needed
      cy.get('#main-product-img-43').should('be.visible'); // Verify image
      cy.get("h1[itemprop='name']").should('contain.text', 'Smartphone'); // Verify product name
     // cy.get(".price-value-43").should('contain.text', '100.00'); // Verify product price
  
      // Go back to search results
      cy.go('back');
  
      // Search for "Computing and Internet"
      cy.get('#small-searchterms').clear().type('Computing and Internet{enter}');
      
      // Verify that search results are displayed
      cy.get('.product-item').should('have.length.greaterThan', 0); // Ensure that there are search results
  
      // Check that the first result contains "Computing and Internet" in the title
      cy.get('.product-item').first().within(() => {
        cy.get('.product-title').should('contain.text', 'Computing and Internet'); // Ensure the product title contains "Computing and Internet"
        cy.get('.picture > a > img').should('be.visible'); // Verify that the product image is visible
      });
  
      // Click on the first search result
      cy.get('.product-item').first().click();
      
      // Optionally, you could verify the product page details if needed
      cy.get(':nth-child(1) > .product-item > .picture > a > img').should('be.visible').click(); // Verify image
      cy.get('h1').should('contain.text', 'Computing and Internet'); // Verify product name
      cy.get(".price-value-13").should('contain.text', '10.00'); // Verify product price
    });
  });

  describe('Product Details Validation', () => {  
    beforeEach(() => {
      // Visit the homepage for all test cases
      cy.visit('https://demowebshop.tricentis.com/');
    });

    // 3.1 Validate that product detail pages display accurate information
    it('Should display accurate product details and highlight price', () => {
      // Search for "Smartphone"
      cy.get('#small-searchterms').type('Smartphone{enter}');
      cy.get('.picture > a > img').click(); // Click on the first product
  
      // Verify Smartphone product details
      cy.get("h1[itemprop='name']").should("contain.text", "Smartphone"); // Verify product name
      cy.get(".price-value-43")
        .should("contain.text", "100.00") // Verify product price
        .invoke('css', 'border', '2px solid red') // Highlight with red border
        .invoke('css', 'padding', '5px'); // Add padding for better visibility
  
      cy.get('.full-description > :nth-child(3)')
        .should("contain.text", "Battery life 8h in power use"); // Verify product specification
  
      // Navigate back to search results
      cy.go('back');
  
      // Search for "14.1-inch Laptop"
      cy.get('#small-searchterms').clear().type('14.1-inch Laptop{enter}');
      cy.get("img[title='Show details for 14.1-inch Laptop']").click(); // Click on the laptop product
  
      // Verify 14.1-inch Laptop product details
      cy.get("h1[itemprop='name']").should("contain.text", "14.1-inch Laptop"); // Verify product name
      cy.get(".price-value-31")
        .should("contain.text", "1590.00") // Verify product price
        .invoke('css', 'border', '2px solid red') // Highlight with red border
        .invoke('css', 'background-color', 'yellow') // Set background color to yellow
        .invoke('css', 'padding', '5px'); // Add padding for better visibility
  
      cy.get("tbody tr:nth-child(1) td:nth-child(2)")
        .should("contain.text", "14.1"); // Verify size
  
      cy.get(':nth-child(4) > .spec-value')
        .should("contain.text", "250 GB"); // Verify hardware
    });
  
    // 3.2 Test the functionality of the 'Add to Cart' button
    it("Test the functionality of the 'Add to Cart' button", () => {
      cy.get("a[class='ico-cart'] span[class='cart-label']").should("be.visible") // Cart visible
      cy.get("a[class='ico-cart'] span[class='cart-label']").should("have.text", "Shopping cart") // Verify title
      cy.get("a[class='ico-cart'] span[class='cart-label']").click()
      cy.get('h1').should('have.text', 'Shopping cart')
      cy.get('.order-summary-content').should('have.text', '\n    \n    \nYour Shopping Cart is empty!    \n')
      cy.go('back')
      cy.get('#small-searchterms').type("Build your own cheap computer{enter}") // Search product
      cy.get('.picture > a > img').click() // Image click
      cy.get('#add-to-cart-button-72').click() // Add product to cart
      cy.get('#topcartlink > .ico-cart').click() // Go to cart
      cy.get('.product-picture').should("have.length", 1)
      cy.wait(3000)
      cy.get('.remove-from-cart > input').click()
      cy.get('.update-cart-button').click()
    })
  })

  describe('Cart Management', () => {  
    beforeEach(() => {
      // Visit the homepage for all test cases
      cy.visit('https://demowebshop.tricentis.com/');
    });
  
    // Cart Management
    // 4.1 Add items to the cart
    it("Add items to the cart", () => {
      cy.searchAndAddToCart("Black & White Diamond Heart", 14); // Add Product 
      cy.searchAndAddToCart("Smartphone", 43);                // Add Product 
      cy.searchAndAddToCart("14.1-inch Laptop", 31);          // Add Product 
      cy.openCart();                                          // Open the cart
    });
  
    // 4.2 Remove items from the cart
    it("Remove items from the cart", () => {
      cy.get('#small-searchterms').type("Blue and green Sneaker{enter}") // Product 1 search
      cy.get("div[class='product-item'] img[title='Show details for Blue and green Sneaker']").click()
      cy.get("#add-to-cart-button-28").click()
      cy.get('#small-searchterms').type("Black & White Diamond Heart{enter}") // Product 2 search
      cy.get("img[title='Show details for Black & White Diamond Heart']").click()
      cy.get("#add-to-cart-button-14").click()
      cy.get('#small-searchterms').type("Smartphone{enter}") // Product 3 search
      cy.get('.product-item > .picture > a > img').click()
      cy.get("#add-to-cart-button-43").click()
      cy.get('#small-searchterms').type("14.1-inch Laptop{enter}") // Product 4 search
      cy.get("img[title='Show details for 14.1-inch Laptop']").click()
      cy.get("#add-to-cart-button-31").click()
      cy.get('.ico-cart > .cart-label').should("be.visible") // Cart visible
      cy.get('.ico-cart > .cart-label').click() // Cart click
      // Remove items from the cart
      cy.get(':nth-child(2) > .remove-from-cart > input').click()
      cy.get(':nth-child(4) > .remove-from-cart > input').click()
      cy.get("input[value='Update shopping cart']").click()
      cy.screenshot()
    })
  
    // 4.3 Verify cart total calculations
    it('Verify cart total calculations', () => {
      // Search for the first product
      cy.get('#small-searchterms').type('Smartphone{enter}');
      cy.get('.picture > a > img').click();
      cy.get('#add-to-cart-button-43').click();
    
      // Search for the second product
      cy.get('#small-searchterms').type('Blue and green Sneaker{enter}');
      cy.get("div[class='product-item'] img[title='Show details for Blue and green Sneaker']").click();
      cy.get('#add-to-cart-button-28').click();
  
      cy.get('.ico-cart > .cart-label').click()
    
      // Verify the price of the first product
      cy.get(':nth-child(1) > .unit-price').should('contain', '100.00');
    
      // Verify the price of the second product
      cy.get(':nth-child(2) > .unit-price').should('contain', '11.00');
  
      // Verify the cart total
      cy.get('.cart-total').should('contain', '111.00'); // Assuming the total is 111.00
    });
  })

  describe('User Registration Tests', () => {
    beforeEach(() => {
      // Visit the registration page before each test
      cy.visit('https://demowebshop.tricentis.com/register');
    });

    // 5.1 Test user registration with valid and invalid inputs
    context('Valid Registration', () => {
      it('Should register a user with valid inputs', () => {
        // Click on the Register link
        cy.get(".ico-register").click();
  
        // Fill out the registration form
        cy.get("#gender-male").click();
        cy.get('#FirstName').type("momidi");
        cy.get('#LastName').type("sai kumar");
        cy.get('#Email').type(`saikumarmomidi${Date.now()}@gmail.com`); // Ensure unique email
        cy.get("#Password").type("Sai@1432");
        cy.get("#ConfirmPassword").type("Sai@1432");
  
        // Submit the form
        cy.get('#register-button').click();
  
        // Verify that the registration was successful
        cy.get('.result').should('be.visible').and('contain.text', 'Your registration completed');
      });
    });

    context('Invalid Registration', () => {
      it('Should display error for mismatched passwords', () => {
        cy.get('#gender-male').click();
        cy.get('#FirstName').type("momidi");
        cy.get('#LastName').type("sai kumar");
        cy.get('#Email').type(`saikumarmomidi${Date.now()}@gmail.com`);
        cy.get("#Password").type("Sai@1432");
        cy.get("#ConfirmPassword").type("sai@1432"); // Mismatched password
        cy.get('#register-button').click();
        cy.get('form').find('.field-validation-error > span').should('contain.text', 'The password and confirmation password do not match.');
      });
    });

    // 5.2 Verify successful registration and email confirmation
    context('Successful Registration', () => {
      it('Should register a user with valid inputs', () => {
        // Click on the Register link
        cy.get(".ico-register").click();
  
        // Fill out the registration form
        cy.get("#gender-male").click();
        cy.get('#FirstName').type("momidi");
        cy.get('#LastName').type("sai kumar");
        cy.get('#Email').type(`saikumarmomidi${Date.now()}@gmail.com`); // Ensure unique email
        cy.get("#Password").type("Sai@1432");
        cy.get("#ConfirmPassword").type("Sai@1432");
  
        // Submit the form
        cy.get('#register-button').click();
  
        // Verify that the registration was successful
        cy.get('.result').should('be.visible').and('contain.text', 'Your registration completed'); // Note: Email confirmation not tested
      });
    });
  });

  describe('User Login/Logout', () => {  
  beforeEach(() => {
    // Visit the homepage for all test cases
    cy.visit('https://demowebshop.tricentis.com/');
  });

  // 6.1 Test login functionality with valid and invalid credentials
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

  // 6.2 Test logout functionality
  it('Test logout functionality', () => {
    cy.get('.ico-login').click();
    cy.get('#Email').type('saikumarmomidi17@gmail.com');
    cy.get('#Password').type('Sai@1432');
    cy.get('form > .buttons > .button-1').click();
    cy.wait(2000);
    cy.get('.ico-logout').click();
  });
});

describe('Checkout Process', () => {  
  beforeEach(() => {
    // Visit the homepage for all test cases
    cy.visit('https://demowebshop.tricentis.com/');
  });

  // 7.1 Test the checkout process with valid payment information
  it('Test the checkout process with valid payment information', () => {
    cy.get('.ico-login').click();
    cy.get('#Email').type('saikumarmomidi17@gmail.com');
    cy.get('#Password').type('Sai@1432');
    cy.get('form > .buttons > .button-1').click();

    cy.get("a[class='ico-cart'] span[class='cart-label']").click();
    cy.get('#small-searchterms').type('Blue Jeans{enter}'); // Search for product
    cy.get('.product-item > .picture > a > img').click(); // Product click
    cy.get('#add-to-cart-button-36').click();
    cy.get("a[class='ico-cart'] span[class='cart-label']").click();
    cy.get('#termsofservice').click();
    cy.get('#checkout').click();
    
    cy.get('#billing-address-select').select(2); // Replace with actual option value
    //cy.get('#BillingNewAddress_Company').type('Wipro');
    cy.get('#BillingNewAddress_Company').type('Wipro', { force: true });
    //cy.get('#BillingNewAddress_CountryId').select('India');
    cy.get('#BillingNewAddress_CountryId').select('India', { force: true });
    //cy.get('#BillingNewAddress_City').type('Nellore');
    cy.get('#BillingNewAddress_City').type('Nellore', { force: true });

    cy.get('#BillingNewAddress_Address1').type('6/24 Navalakula Gardens', { force: true });
    cy.get('#BillingNewAddress_Address2').type('Ashoknagar, Nellore',{ force: true });
    cy.get('#BillingNewAddress_ZipPostalCode').type('524002',{ force: true });
    cy.get('#BillingNewAddress_PhoneNumber').type('9704842702',{ force: true });
    cy.get('#BillingNewAddress_FaxNumber').type('+91 861 97048 42702',{ force: true });
    cy.get("input[onclick='Billing.save()']").click();
    cy.get('#billing-buttons-container > .button-1').click({ force: true });
    
    cy.get('#PickUpInStore').click();
    cy.get('#shipping-buttons-container > .button-1').click();
    cy.get('#paymentmethod_0').click();
    cy.get('input.button-1.payment-method-next-step-button').click();
    cy.get('input.button-1.payment-info-next-step-button').click();
    cy.get('input[value="Confirm"]').click();
    
    cy.get('strong').should('have.text', 'Your order has been successfully processed!');
    cy.get('input[value="Continue"]').click();
  });

  // 7.2 Verify order confirmation and summary
  it('Verify order', () => {
    cy.get('.ico-login').click();
    cy.get('#Email').type('saikumarmomidi17@gmail.com');
    cy.get('#Password').type('Sai@1432');
    cy.get('form > .buttons > .button-1').click();
    cy.get('div.header-links a.account').click();
    cy.get('div.master-wrapper-main li:nth-child(3) a:nth-child(1)').click();
    cy.get('.center-2').should('be.visible');
    cy.get(':nth-child(1) > .buttons > .button-2').click()
    // Verify that the order details section is visible
    cy.get('.a-left').should('be.visible');
    // Verify that the order number is displayed
    cy.get('.order-number > strong').should('be.visible');
    // Verify that order details are displayed
    cy.get('.order-details > :nth-child(1)').should('be.visible');
    // verify the payment method
    cy.get('.payment-method').should('be.visible')
  });
});
})