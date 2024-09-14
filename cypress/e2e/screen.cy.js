describe('Homepage Navigation', () => {
    it('takescreenshot', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.screenshot()
    })
})