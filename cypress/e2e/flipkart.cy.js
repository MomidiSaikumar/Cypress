describe('Flipkart End-to-End Tests', () => {
  
    describe('Homepage Navigation', () => {
      
      it('Verify that the homepage loads correctly', () => {
        const startTime = new Date().getTime();
        
        cy.visit('https://www.flipkart.com/').then(() => {
          cy.window().then(() => {
            const loadTime = new Date().getTime() - startTime;
            cy.log(`Flipkart homepage load time: ${loadTime}ms`);
            expect(loadTime).to.be.lessThan(30000);
          });
        });
  
        cy.url().should('eq', 'https://www.flipkart.com/');
        cy.title().should('eq', 'Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!');
        cy.url().should('include', 'flipkart');
      });
  
      it('Check that product categories are displayed', () => {
        cy.visit('https://www.flipkart.com/');
        
        // Verify the visibility of key elements
        cy.get("img[title='Flipkart']").should('be.visible');
        cy.get('._3sdu8W.emupdz').should('be.visible');
        cy.get(':nth-child(3) > ._38VF5e > ._3RX0a- > ._1XmrCc').should('be.visible');
        cy.get('.Pke_EE').should('be.visible');
      });
  
    });
  
    describe('Product Detail Page Tests', () => {
      
      beforeEach(() => {
        cy.visit('https://www.flipkart.com/');
      });
      
      it('Test the search functionality for various product queries', () => {
        // Search for a product and verify results
        cy.get('.Pke_EE').type('realme 11 8 128{enter}');
        cy.get('[target="_blank"]').should('be.visible');
        cy.go('back');
        cy.wait(3000);
  
        cy.get('._30XB9F').click();
        cy.get('.Pke_EE').type('i phone 15 pro max 1tb{enter}');
        cy.get('.CGtC98').should('be.visible');
        cy.go('back');
        cy.wait(3000);
  
        cy.get('.Pke_EE').type('motorola edge 50 8 256{enter}');
        cy.get('.CGtC98').should('be.visible');
      });
  
      it('Verify search results', () => {
        // Search for different products and verify that results are displayed
        cy.get('.Pke_EE').type('realme 11 8 128{enter}');
        cy.get('[target="_blank"]').should('be.visible').and('have.length.greaterThan', 0);
        cy.go('back');
        cy.wait(3000);
  
        cy.get('._30XB9F').click();
        cy.get('.Pke_EE').type('i phone 15 pro max 1tb{enter}');
        cy.get('.CGtC98').should('be.visible').and('have.length.greaterThan', 0);
        cy.go('back');
        cy.wait(3000);
  
        cy.get('.Pke_EE').type('motorola edge 50 8 256{enter}');
        cy.get('.CGtC98').should('be.visible').and('have.length.greaterThan', 0);
      });
  
    });
  
    describe('Product Details', () => {
  
      beforeEach(() => {
        cy.visit('https://www.flipkart.com/');
      });
  
      it('Validate that product detail pages display accurate information', () => {
        cy.get('.Pke_EE').type('oneplus 12 16 512{enter}');
        cy.contains('OnePlus 12 (Silky Black, 512 GB)').invoke('removeAttr', 'target').click();
  
        // Validate product details
        cy.get('.VU-ZEz').should('contain', 'OnePlus 12 (Silky Black, 512 GB)');
        cy.get('._3Fm-hO').scrollIntoView({ duration: 2000 });
  
        // Validate specifications
        cy.get(':nth-child(1) > ._0ZhAN9 > tbody > :nth-child(4) > .Izz52n > ul > .HPETK2').should('contain.text', 'Silky Black');
        cy.get('._3Fm-hO > :nth-child(2) > .QqFHMw').click();
        cy.get(':nth-child(4) > ._0ZhAN9 > tbody > :nth-child(1) > .Izz52n > ul > .HPETK2').should('contain', '512 GB');
        cy.get(':nth-child(4) > ._0ZhAN9 > tbody > :nth-child(2) > .Izz52n > ul > .HPETK2').should('contain', '16 GB');
        cy.get(':nth-child(7) > ._0ZhAN9 > tbody > .WJdYP6 > .Izz52n > ul > .HPETK2').should('contain', '5400 mAh');
        cy.get(':nth-child(3) > ._0ZhAN9 > tbody > :nth-child(2) > .Izz52n > ul > .HPETK2').should('contain', 'Snapdragon');
      });
  
      it('Test the functionality of the "Add to Cart" button', () => {
        cy.get('.Pke_EE').type('oneplus 12 16 512{enter}');
        cy.contains('OnePlus 12 (Silky Black, 512 GB)').invoke('removeAttr', 'target').click();
        
        // Validate visibility of "Add to Cart" button
        cy.get('[data-top="1440.8"]').should('be.visible'); // Ensure this selector matches the "Add to Cart" button
      });
  
    });
  
  });
  