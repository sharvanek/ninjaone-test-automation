describe('Happy Path - Login', () => {
  it('logs in successfully with valid credentials', () => {
    // Visit the login page
    cy.visit(Cypress.env('login_url'))

    // Fill in login form
    // Select input by id as no data-testid attributes
    cy.get('#email').type('your-email@example.com')
    cy.get('#password').type(Cypress.env('password'))

    // Click the login button
    // Select Sign In button by type as no data-testid attributes
    cy.get('button[type="submit"]').click()

    // Assert that login was successful
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome').should('be.visible')
  })
})

describe('Negative Path - Login Failure', () => {
  it('does not log in with invalid credentials', () => {
    // Visit the login page
    cy.visit(Cypress.env('login_url'))

    // Fill in the login form with invalid credentials
    cy.get('#email').type('invalid-user@example.com')
    cy.get('#password').type('wrong-password')

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password')
      .should('be.visible')

    // Ensure we’re still on the login page
    cy.url().should('include', '/login')
  })
})


