describe('Homepage Navigation', () => {
  beforeEach(() => {
    cy.visitHomepage();
  });

  it('Should load the homepage correctly', () => {
    cy.get('img[alt="Tricentis Demo Web Shop"]').should('be.visible');
    cy.url().should('eq', 'https://demowebshop.tricentis.com/');
    cy.url().should('include', 'demowebshop');
    cy.title().should('include', 'Demo Web Shop');
  });

  it('Should display product categories', () => {
    cy.get("div.block.block-category-navigation div.title").should('be.visible');
    cy.get('.center-3').should('be.visible');
    cy.wait(2000);
    cy.get('.footer-menu-wrapper').scrollIntoView({ duration: 2000 });
  });
});
describe('Product Search', () => {
  beforeEach(() => {
    cy.visitHomepage();
  });

  it('Should search for a product and display results', () => {
    cy.searchForProduct('Desktop PC with CDRW');
    cy.go(-2);
    cy.searchForProduct('Smartphone');
    cy.go(-2);
    cy.searchForProduct('Computing and Internet');
  });

  it('Should display relevant search results and validate basic product details', () => {
    cy.searchForProduct('Smartphone');
    cy.verifyProductDetails('Smartphone', '100.00', '#main-product-img-43');
    cy.go('back');
    cy.searchForProduct('Computing and Internet');
    cy.verifyProductDetails('Computing and Internet', '10.00', ':nth-child(1) > .product-item > .picture > a > img');
  });
});
describe('Cart Management', () => {
  beforeEach(() => {
    cy.visitHomepage();
  });

  it('Add items to the cart', () => {
    cy.searchForProduct('Blue and green Sneaker');
    cy.addProductToCart("img[title='Show details for Blue and green Sneaker']", '#add-to-cart-button-28');
    cy.searchForProduct('Black & White Diamond Heart');
    cy.addProductToCart("img[title='Show details for Black & White Diamond Heart']", '#add-to-cart-button-14');
    cy.searchForProduct('Smartphone');
    cy.addProductToCart('.product-item > .picture > a > img', '#add-to-cart-button-43');
    cy.searchForProduct('14.1-inch Laptop');
    cy.addProductToCart("img[title='Show details for 14.1-inch Laptop']", '#add-to-cart-button-31');
    cy.get('.ico-cart > .cart-label').should('be.visible');
    cy.get('.ico-cart > .cart-label').click();
  });

  it('Remove items from the cart', () => {
    cy.searchForProduct('Blue and green Sneaker');
    cy.addProductToCart("img[title='Show details for Blue and green Sneaker']", '#add-to-cart-button-28');
    cy.searchForProduct('Black & White Diamond Heart');
    cy.addProductToCart("img[title='Show details for Black & White Diamond Heart']", '#add-to-cart-button-14');
    cy.searchForProduct('Smartphone');
    cy.addProductToCart('.product-item > .picture > a > img', '#add-to-cart-button-43');
    cy.searchForProduct('14.1-inch Laptop');
    cy.addProductToCart("img[title='Show details for 14.1-inch Laptop']", '#add-to-cart-button-31');
    cy.get('.ico-cart > .cart-label').click();
    cy.get(':nth-child(2) > .remove-from-cart > input').click();
    cy.get(':nth-child(4) > .remove-from-cart > input').click();
    cy.get("input[value='Update shopping cart']").click();
  });

  it('Verify cart total calculations', () => {
    cy.searchForProduct('Smartphone');
    cy.addProductToCart('.product-item > .picture > a > img', '#add-to-cart-button-43');
    cy.searchForProduct('Blue and green Sneaker');
    cy.addProductToCart("div[class='product-item'] img[title='Show details for Blue and green Sneaker']", '#add-to-cart-button-28');
    cy.get('.ico-cart > .cart-label').click();
    cy.get(':nth-child(1) > .unit-price').should('contain', '100.00');
    cy.get(':nth-child(2) > .unit-price').should('contain', '11.00');
    cy.get('.cart-total').should('contain', '111.00');
  });
});

