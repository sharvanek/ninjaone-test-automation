describe('Login Success - Valid Credentials', () => {
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

describe('Login Failure Scenarios', () => {
  it('does not log in with completely invalid credentials', () => {
    // Visit the login page
    cy.visit(Cypress.env('login_url'))

    // Fill in the login form with invalid credentials
    cy.get('#email').type('invalid-user@example.com')
    cy.get('#password').type('wrong-password') 

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Ensure we’re still on the login page
    cy.url().should('include', '/login')
  })

  it('does not log in with valid email and invalid password', () => {
    // Visit the login page
    cy.visit(Cypress.env('login_url'))

    // Fill in the login form 
    cy.get('#email').type('your-email@example.com') // valid
    cy.get('#password').type('wrongPassword123')    // invalid

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Ensure we’re still on the login page
    cy.url().should('include', '/login')
  })

  it('does not log in with invalid email and valid password', () => {
    // Visit the login page
    cy.visit(Cypress.env('login_url'))

    // Fill in the login form
    cy.get('#email').type('invalid-user@example.com') // invalid
    cy.get('#password').type(Cypress.env('password')) // valid

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Ensure we’re still on the login page
    cy.url().should('include', '/login')
  })

  it('shows validation styling and message when login fields are blank', () => {
    // Visit the login page
    cy.visit(Cypress.env('login_url'))

    // Submit the form without filling email and password
    cy.get('button[type="submit"]').click()

    // Assert that validation class appears
    cy.get('#email')
      .parents('.form-group')
      .should('have.class', 'has-error')

    cy.get('#password')
      .parents('.form-group')
      .should('have.class', 'has-error')

    // Check for error message too
    cy.contains('Error during login').should('be.visible')

    // Ensure we’re still on the login page
    cy.url().should('include', '/login')
  })

})
