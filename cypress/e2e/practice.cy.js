describe('Demo Web Shop Automation Testing', () => {
  describe(' Homepage Navigation', () => {
  
    // Common setup before each test
    beforeEach(() => {
      // Visit the homepage for all test cases
      cy.visit('https://demowebshop.tricentis.com/');
    });
  
    // 1.1 Homepage Navigation Tests
    
      it('Should load the homepage correctly', () => {
        cy.get('img[alt="Tricentis Demo Web Shop"]').should('be.visible'); // Verifying the homepage banner title
        cy.url().should('eq',"https://demowebshop.tricentis.com/")
        cy.url().should('include', 'demowebshop');
      });
    //1.2Check that product categories are displayed
      it('Should display product categories', () => {
        // Verifying that the product categories are displayed by checking the title inside the category navigation block
        cy.get("div[class='block block-category-navigation'] div[class='title']").should('be.visible');
        cy.get('.center-3').should("be.visible").scrollIntoView({ duration: 2000 })
        cy.get(':nth-child(7) > .product-item > .picture > a > img').scrollIntoView({ duration: 2000 })
      });
  })
  describe(' Product Search', () => {  
    beforeEach(() => {
        // Visit the homepage for all test cases
        cy.visit('https://demowebshop.tricentis.com/');
      });
    
  
    // 2.1 Product Search Tests
      //Test the search functionality for various product queries
    
        it('Should search for a product and display results', () => {
            cy.get('#small-searchterms').type('1MP 60GB Hard Drive Handycam Camcorde{enter}'); // Typing the product name in the search bar
            cy.get('.picture > a > img').click()
            cy.go(-2)// Navigate back to the previous pages
            
            cy.get('#small-searchterms').type("Smartphone{enter}")
            cy.get('.picture > a > img').click()
            cy.go(-2)//Navigate back to the previous pages
            cy.get("#small-searchterms").type("Black & White Diamond Heart{enter}")
            cy.get("img[title='Show details for Black & White Diamond Heart']").click()
        });
        //2.2Verify search results
        it('Verify search results',()=>{
            cy.get('#small-searchterms').type("Smartphone{enter}")
            cy.get("#small-searchterms").should("have.length",1)//verify search results( chache) length
            cy.get('.picture > a > img').click()
            cy.get('#main-product-img-43').should("be.visible")//verify image
            cy.get("h1[itemprop='name']").should("contain","Smartphone")//verify product name
            cy.get(".price-value-43").should("contain","100.00")
        })
  })
  describe(' Product Details', () => {  
    beforeEach(() => {
        // Visit the homepage for all test cases
        cy.visit('https://demowebshop.tricentis.com/');
      });   
  
        //3.1Product Details
        it("Verify search results",()=>{
            cy.get('#small-searchterms').type("Smartphone{enter}")
            cy.get('.picture > a > img').click()
            cy.get("h1[itemprop='name']").should("contain","Smartphone")//verify product name
            cy.get(".price-value-43").should("contain","100.00")//verify product price
            cy.get('.full-description > :nth-child(3)').should("contain","Battery life 8h in power use")//product specification
            cy.go(-2)//Navigate back to the previous pages
            cy.get('#small-searchterms').type('14.1-inch Laptop{enter}')//lap search
            cy.get("img[title='Show details for 14.1-inch Laptop']").click()
            cy.get("h1[itemprop='name']").should("contain","14.1-inch Laptop")//verify product name
            cy.get(".price-value-31").should("contain","1590.00")//verify price
            cy.get("tbody tr:nth-child(1) td:nth-child(2)").should("contain","14.1")//verify size
            cy.get(':nth-child(4) > .spec-value').should("contain","250 GB")//verify hardware
        })
        //3.2Test the functionality of the 'Add to Cart' button
  
        it("Test the functionality of the 'Add to Cart' button",()=>{
            cy.get("a[class='ico-cart'] span[class='cart-label']").should("be.visible")//cart visible
            cy.get("a[class='ico-cart'] span[class='cart-label']").should("have.text","Shopping cart")//verify title
            cy.get('#small-searchterms').type("Build your own cheap computer{enter}")//search product
            cy.get('.picture > a > img').click()//image click
            cy.get('#add-to-cart-button-72').click()//add  product to maximize 
            cy.get('#topcartlink > .ico-cart').click()//add to acrt
            cy.get('.product-picture').should("have.length",1)
            /*cy.get("#small-searchterms").type("Blue and green Sneaker{enter}")
            //cy.get('.product-item > .picture > a > img').click()
            //cy.get("#add-to-cart-button-28").click()
            //cy.get("a[class='ico-cart'] span[class='cart-label']").click()
  
            //cy.get('.remove-from-cart > input').click()
            //cy.get('.update-cart-button').click()*/
        })

    })
    describe('Cart Management', () => {  
        beforeEach(() => {
            // Visit the homepage for all test cases
            cy.visit('https://demowebshop.tricentis.com/');
          });
          //Cart Management
          //4.1 Add items to the cart
          it("Add items to the cart",()=>{
            cy.get('#small-searchterms').type("Smartphone{enter}")//product 1 search
            cy.get('.picture > a > img').click()
            cy.get("#add-to-cart-button-43").click()
            cy.get('#small-searchterms').type("Blue and green Sneaker{enter}")//product 2 search
            cy.get("div[class='product-item'] img[title='Show details for Blue and green Sneaker']").click()
            cy.get("#add-to-cart-button-28").click()
            cy.get('#small-searchterms').type("Black & White Diamond Heart{enter}")//product 3 search
            cy.get("img[title='Show details for Black & White Diamond Heart']").click()
            cy.get("#add-to-cart-button-14").click()
            cy.get('#small-searchterms').type("14.1-inch Laptop{enter}")//product 4 search
            cy.get("img[title='Show details for 14.1-inch Laptop']").click()
            cy.get("#add-to-cart-button-31").click()
            cy.get('.ico-cart > .cart-label').should("be.visible")
          })
         //4.2 Remove items from the cart
          it("Remove items from the cart",()=>{
            cy.get('#small-searchterms').type("Smartphone{enter}")//product 1 search
            cy.get('.picture > a > img').click()
            cy.get("#add-to-cart-button-43").click()
            cy.get('#small-searchterms').type("Blue and green Sneaker{enter}")//product 2 search
            cy.get("div[class='product-item'] img[title='Show details for Blue and green Sneaker']").click()
            cy.get("#add-to-cart-button-28").click()
            cy.get('#small-searchterms').type("Black & White Diamond Heart{enter}")//product 3 search
            cy.get("img[title='Show details for Black & White Diamond Heart']").click()
            cy.get("#add-to-cart-button-14").click()
            cy.get('#small-searchterms').type("14.1-inch Laptop{enter}")//product 4 search
            cy.get("img[title='Show details for 14.1-inch Laptop']").click()
            cy.get("#add-to-cart-button-31").click()
            cy.get('.ico-cart > .cart-label').should("be.visible")//cred visible
            cy.get('.ico-cart > .cart-label').click()//cart click
            //Remove items from the cart
            cy.get(':nth-child(2) > .remove-from-cart > input').click()
            cy.get(':nth-child(4) > .remove-from-cart > input').click()
            cy.get("input[value='Update shopping cart']").click()
          })

    
          //4.3Verify cart total calculations
          it("Verify cart total calculations",()=>{
              cy.get('#small-searchterms').type("Smartphone{enter}")//product 1 search
              cy.get('.picture > a > img').click()
              cy.get("#add-to-cart-button-43").click()
              cy.get('#small-searchterms').type("Blue and green Sneaker{enter}")//product 2 search
              cy.get("div[class='product-item'] img[title='Show details for Blue and green Sneaker']").click()
              cy.get("#add-to-cart-button-28").click()
              
            })
    })
    describe(' User Registration', () => {  
        beforeEach(() => {
            // Visit the homepage for all test cases
            cy.visit('https://demowebshop.tricentis.com/');
          });
            //User Registration
        //5.1Test user registration with validregistation valid
          it("registation",()=>{
            cy.get(".ico-register").click()
            cy.get("#gender-male").click()
            cy.get('#FirstName').type("venky")
            cy.get('#LastName').type("momidi")
            cy.get(':nth-child(4) > label').type("friends@gmail.com")//change mail every time
            cy.get("#Password").type("Sai12345")
            cy.get("#ConfirmPassword").type("Sai12345")
            cy.get('#register-button').click()
            cy.get('.result').should("be.visible")
        })
    
    
       //Test user registration with invalid inputs
        it("registation",()=>{
            cy.get(".ico-register").click()
            cy.get("#gender-male").click()
            cy.get('#FirstName').type("venky")
            cy.get('#LastName').type("momidi")
            cy.get(':nth-child(4) > label').type("friends12#gmail.com")
            cy.get("#Password").type("Sai12345")
            cy.get("#ConfirmPassword").type("Sai12345")
            cy.get('#register-button').click()
            cy.get('.field-validation-error > span')
            
            
        })
    })
    describe('User Login/Logout', () => {  
        beforeEach(() => {
            // Visit the homepage for all test cases
            cy.visit('https://demowebshop.tricentis.com/');
          });   
         //6.1 Test login functionality with valid and invalid credentials
        it("login functionality with valid credentials",()=>{
            cy.get(".ico-login").click()
            cy.get("#Email").type("friends12@gmail.com")
            cy.get("#Password").type("Sai12345")
            cy.get('form > .buttons > .button-1').click()
        })
            //6.1 login functionality with invalid credentials
        it("login functionality with invalid credentials",()=>{
            cy.get(".ico-login").click()
            cy.get("#Email").type("friends12@gmail.com")
            cy.get("#Password").type("Sai123456")
            cy.get('form > .buttons > .button-1').click()
            cy.get('.validation-summary-errors').should("be.visible")
        })
           //6.2 Test logout functionality
        it("Test logout functionality",()=>{
            cy.get(".ico-login").click()
            cy.get("#Email").type("friends12@gmail.com")
            cy.get("#Password").type("Sai12345")
            cy.get('form > .buttons > .button-1').click()
            cy.wait(2000)
            cy.get(".ico-logout").click()
        })
    })
    describe('Checkout Process', () => {  
        beforeEach(() => {
            // Visit the homepage for all test cases
            cy.visit('https://demowebshop.tricentis.com/');
          });
  
        
       //7.1Test the checkout process with valid payment information
       //checkout process
       it("Test the checkout process with valid payment information",()=>{
        cy.get(".ico-login").click()
        cy.get("#Email").type("friends12@gmail.com")
        cy.get("#Password").type("Sai12345")
        cy.get('form > .buttons > .button-1').click()
  
        cy.get("a[class='ico-cart'] span[class='cart-label']").click()
        cy.get("#small-searchterms").type("Phone Cover{enter}")//search for product
        //cy.get("img[title='Show details for Phone Cover']").click()
        cy.get('.product-item > .picture > a > img').click()// product click
        cy.get("#add-to-cart-button-80").click()
        cy.get("a[class='ico-cart'] span[class='cart-label']").click()
        cy.get("#termsofservice").click()
        cy.get("#checkout").click()
       // cy.get("#billing-address-select").select("New Adress")
        /*cy.get('#billing-address-select').click()
        cy.get("#BillingNewAddress_Company").type("ABC")
        cy.get("#BillingNewAddress_CountryId").select("India")
        cy.get("#BillingNewAddress_City").type("kadapa")
        cy.get("#BillingNewAddress_Address1").type("2/345A,kadapa")
        cy.get("#BillingNewAddress_Address2").type("2/345A,kadapa")
        cy.get("#BillingNewAddress_ZipPostalCode").type("765489")
        cy.get("#BillingNewAddress_PhoneNumber").type("9876543210")
        cy.get("#BillingNewAddress_FaxNumber").type("9876543210")*/
       // cy.get("input[onclick='Billing.save()']").click()//regesrte
        
        cy.get('#billing-buttons-container > .button-1').click()
        cy.get('#PickUpInStore').click()
        cy.get('#shipping-buttons-container > .button-1').click()
        cy.get("#paymentmethod_0").click()
        cy.get("input[class='button-1 payment-method-next-step-button']").click()
        cy.get("input[class='button-1 payment-info-next-step-button']").click()
        cy.get("input[value='Confirm']").click()
        cy.get('strong').should("have.text","Your order has been successfully processed!")
        cy.get("input[value='Continue']").click()
       })
    
        //7.2Verify order confirmation and summary
        it("verify order",()=>{
            cy.get(".ico-login").click()
            cy.get("#Email").type("friends12@gmail.com")
            cy.get("#Password").type("Sai12345")
            cy.get('form > .buttons > .button-1').click()
            cy.get("div[class='header-links'] a[class='account']").click()
            cy.get("div[class='master-wrapper-main'] li:nth-child(3) a:nth-child(1)").click()
            cy.get('.center-2').should("be.visible")
         })
    })
})