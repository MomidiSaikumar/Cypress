beforeEach(() => {
  cy.visit('https://www.flipkart.com/');
  cy.get('[data-testid="register-existing-user-login-link"]').click(); // Assuming this is the registration link selector
});

it('registers a new user with valid data', () => {
  // Enter valid user data
  cy.get('#firstName').type(validUserData.firstName);
  cy.get('#lastName').type(validUserData.lastName);
  cy.get('#email').type(validUserData.email);
  cy.get('#mobileNumber').type(validUserData.mobileNumber);
  cy.get('input[type="password"]').first().type(validUserData.password); // Select the first password input
  cy.get('input[type="password"]').last().type(validUserData.confirmPassword); // Select the last password input (confirm password)

  // Submit the registration form
  cy.get('button[type="submit"]').click();

  // Verify successful registration (replace with appropriate assertions based on Flipkart's success message)
  cy.get('.success-message').should('be.visible'); // Adjust selector for actual success message
});

invalidUserData.forEach((userData) => {
  it('fails to register a new user with invalid data: ' + JSON.stringify(userData), () => {
    // Enter invalid user data
    cy.get('#firstName').type(userData.firstName);
    cy.get('#lastName').type(userData.lastName);
    cy.get('#email').type(userData.email);
    cy.get('#mobileNumber').type(userData.mobileNumber);   

    cy.get('input[type="password"]').first().type(userData.password);
    cy.get('input[type="password"]').last().type(userData.confirmPassword);

    // Submit the registration form
    cy.get('button[type="submit"]').click();

    // Verify error messages (replace with appropriate assertions based on Flipkart's error handling)
    cy.get('.error-message').should('be.visible'); // Adjust for specific error messages per field
  });
});