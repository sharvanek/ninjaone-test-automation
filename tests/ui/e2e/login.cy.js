describe('Login Success - Valid Credentials', () => {
  it('logs in successfully with valid credentials', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Enter valid credentials (from environment variables)
    // Select input by id as no data-testid attributes
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    // Submit the login form
    // Select Sign In button by type as no data-testid attributes
    cy.get('button[type="submit"]').click()

    // Assert successful login — update as needed based on actual app behavior
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome').should('be.visible')
  })
})

describe('Login Failure - Invalid Credentials', () => {
  it('does not log in with completely invalid credentials', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Fill in the login form with invalid credentials
    cy.get('#email').type('invalid-user@example.com')
    cy.get('#password').type('wrong-password') 

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Expect a generic login error message
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Confirm the user is not redirected away from the login page
    cy.url().should('include', '/login')
  })

  it('does not log in with valid email and invalid password', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Fill in the login form 
    cy.get('#email').type(Cypress.env('username')) // valid
    cy.get('#password').type('wrongPassword123')    // invalid

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Expect a generic login error message
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Confirm the user is not redirected away from the login page
    cy.url().should('include', '/login')
  })

  it('does not log in with invalid email and valid password', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Fill in the login form
    cy.get('#email').type('invalid-user@example.com') // invalid
    cy.get('#password').type(Cypress.env('password')) // valid

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Expect a generic login error message
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Confirm the user is not redirected away from the login page
    cy.url().should('include', '/login')
  })
})

describe('Login Failure - Input Validation', () => {
it('does not log in when email format is invalid but password is valid', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Fill in the login form
    cy.get('#email').clear().type('not-an-email-format')      // invalid email
    cy.get('#password').clear().type(Cypress.env('password')) // valid password

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Expect a generic login error message
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Confirm the user is not redirected away from the login page
    cy.url().should('include', '/login')
  })

  it('shows validation styling and message when login fields are blank', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Attempt to submit the form without entering credentials
    cy.get('button[type="submit"]').click()

    // Assert that validation styling is applied to both fields
    cy.get('#email')
      .parents('.form-group')
      .should('have.class', 'has-error')

    cy.get('#password')
      .parents('.form-group')
      .should('have.class', 'has-error')
    
    // Assert that login fails
    // Expect a generic login error message
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Error during login').should('be.visible')

    // Confirm the user is not redirected away from the login page
    cy.url().should('include', '/login')
  })
})

describe('Login Edge Cases - Long Inputs', () => {
  it('should allow login with long but valid credentials', () => {
    // Assumption:
    // Many systems support usernames up to 64 chars and passwords up to 128.
    // This test verifies that the app accepts and processes valid long inputs.
    // In a real test suite, these credentials would match a known valid test user.

    // Generate a long but valid email (~60 characters)
    const longUsername = 'user_' + 'a'.repeat(50) + '@example.com'

    // Generate a strong 128-character password (16 chars × 8)
    const longPassword = 'SecureP@ss123!'.repeat(8)

    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Enter long credentials
    cy.get('#email').type(longUsername)
    cy.get('#password').type(longPassword)

    // Submit the login form
    cy.get('button[type="submit"]').click()

    // Assert successful login — update as needed based on actual app behavior
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome').should('be.visible')
  })

  it('should reject login with excessively long credentials', () => {
    // This test ensures the system gracefully rejects input that exceeds typical limits.
    // Even if the frontend doesn't block long input, the backend should prevent login.

    // Generate an overly long email (~300+ characters) to test rejection
    const tooLongEmail = 'a'.repeat(300) + '@example.com'

    // Generate an overly long password (300 characters)
    const tooLongPassword = 'X'.repeat(300)

    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Fill in the login form with excessive inputs
    cy.get('#email').type(tooLongEmail)
    cy.get('#password').type(tooLongPassword)

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Expect a generic login error message
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Confirm the user is not redirected away from the login page
    cy.url().should('include', '/login')
  })
})
