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

  it('logs in successfully with a password containing lowercase, uppercase, numbers, and special characters', () => {
    // NOTE: This test uses a hardcoded complex password string because
    // while an account has been registered, access has not yet been granted.
    // Once valid credentials are provided, update to use environment variables
    // for better security and flexibility.

    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Enter valid username/email (hardcoded here as placeholder)
    cy.get('#email').type('test.user@example.com')

    // Enter a complex password containing different character types
    const complexPassword = 'P@ssw0rd123!'
    cy.get('#password').type(complexPassword)

    // Submit the login form
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

  it('does not log in when email is missing @ symbol', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Enter an email missing the '@' symbol
    cy.get('#email').clear().type('userexample.com')

    // Enter a valid password
    cy.get('#password').clear().type(Cypress.env('password'))

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Expect a generic login error message
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Confirm the user is not redirected away from the login page
    cy.url().should('include', '/login')
  })

  it('does not log in when email is missing domain', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Input email missing the domain part
    cy.get('#email').clear().type('user@')

    // Input a valid password
    cy.get('#password').clear().type(Cypress.env('password'))

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Expect a generic login error message
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Confirm the user is not redirected away from the login page
    cy.url().should('include', '/login')
  })

  it('does not log in when email is missing username', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Enter email with no username before '@'
    cy.get('#email').clear().type('@example.com')

    // Enter valid password
    cy.get('#password').clear().type(Cypress.env('password'))

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Expect a generic login error message
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Confirm the user is not redirected away from the login page
    cy.url().should('include', '/login')
  })

  it('does not log in when email contains spaces', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Input email containing spaces
    cy.get('#email').clear().type('user @example.com')

    // Input valid password
    cy.get('#password').clear().type(Cypress.env('password'))

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Expect a generic login error message
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Confirm the user is not redirected away from the login page
    cy.url().should('include', '/login')
  })

  it('does not log in when email contains invalid special characters', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Enter email with invalid special characters
    cy.get('#email').clear().type('user!@example.com')

    // Enter valid password
    cy.get('#password').clear().type(Cypress.env('password'))

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that login fails
    // Expect a generic login error message
    // Partial match to avoid brittleness if message copy changes slightly
    cy.contains('Invalid username/password').should('be.visible')

    // Confirm the user is not redirected away from the login page
    cy.url().should('include', '/login')
  })

  it('does not log in when email contains multiple @ symbols', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Enter email with multiple '@' symbols
    cy.get('#email').clear().type('user@@example.com')

    // Enter valid password
    cy.get('#password').clear().type(Cypress.env('password'))

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

  it('shows validation styling and error message when email is blank but password is provided', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Leave email blank and type a valid password
    cy.get('#password').type('SomeValidPassword123!')

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that validation styling appears on the email input container
    cy.get('#email')
      .parents('.form-group')
      .should('have.class', 'has-error')

    // Password field should not have validation error since it was filled
    cy.get('#password')
      .parents('.form-group')
      .should('not.have.class', 'has-error')

    // Assert that a generic error message appears
    cy.contains('Error during login').should('be.visible')

    // Confirm the user remains on the login page
    cy.url().should('include', '/login')
  })

  it('shows validation styling and error message when password is blank but email is provided', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Type a valid email and leave password blank
    cy.get('#email').type('valid.user@example.com')

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Assert that validation styling appears on the password input container
    cy.get('#password')
      .parents('.form-group')
      .should('have.class', 'has-error')

    // Email field should not have validation error since it was filled
    cy.get('#email')
      .parents('.form-group')
      .should('not.have.class', 'has-error')

    // Assert that a generic error message appears
    cy.contains('Error during login').should('be.visible')

    // Confirm the user remains on the login page
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

describe('Login Session Persistence', () => {
  it('keeps user logged in after page reload when "Keep me signed in" is checked', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Enter valid credentials (from environment variables)
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    // Enable "Keep me signed in" checkbox to persist session
    cy.get('#staySignedIn').check()

    // Submit the login form
    cy.get('button[type="submit"]').click()

    // Assert successful login — update as needed based on actual app behavior
    cy.url().should('include', '/dashboard')

    // Reload the page to simulate user refreshing browser
    cy.reload()

    // Confirm user is still logged in after page reload
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome').should('be.visible')
  })

  it('keeps user logged in when revisiting login page if "Keep me signed in" is checked', () => {
    // Visit login page
    cy.visit(Cypress.env('loginUrl'))

    // Enter valid credentials (from environment variables)
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    // Enable "Keep me signed in" checkbox to persist session
    cy.get('#staySignedIn').check()

    // Submit the login form
    cy.get('button[type="submit"]').click()

    // Assert successful login — update as needed based on actual app behavior
    cy.url().should('include', '/dashboard')

    // Visit login URL again, simulating user navigating back to login page
    cy.visit(Cypress.env('loginUrl'))

    // Confirm user remains logged in, redirected back to dashboard
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome').should('be.visible')
  })

  it('logs out user when "Keep me signed in" is not checked and cookies cleared', () => {
    // Visit login page
    cy.visit(Cypress.env('loginUrl'))

    // Enter valid credentials (from environment variables)
    cy.get('#email').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))

    // Ensure "Keep me signed in" is unchecked
    cy.get('#staySignedIn').uncheck()

    // Submit the login form
    cy.get('button[type="submit"]').click()

    // Assert successful login — update as needed based on actual app behavior
    cy.url().should('include', '/dashboard')

    // Clear cookies and local storage to simulate session expiration / browser close
    cy.clearCookies()
    cy.clearLocalStorage()

    // Return to login page
    cy.visit(Cypress.env('loginUrl'))

    // Confirm user is logged out and on the login screen
    cy.url().should('include', '/login')
    cy.contains('Login').should('be.visible')
  })
})

describe('Login Page Navigation Links', () => {
  it('navigates to reset password page when clicking "Forgot your password?" link', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Click the link using href attribute selector
    cy.get('a[href="#/resetPassword"]').click()

    // Assert the URL includes the reset password path
    cy.url().should('include', '/resetPassword')

    // Optionally verify some element on the reset password page is visible
    cy.contains('Send').should('be.visible')
  })

  it('opens the free trial signup page when clicking "Do not have an account?" link', () => {
    // Visit the login page
    cy.visit(Cypress.env('loginUrl'))

    // Get the link by its href attribute and check it opens in a new tab with correct rel attributes
    cy.get('a[href="https://www.ninjaone.com/freetrialform/"]')
      .should('have.attr', 'target', '_blank')   // Confirm it opens in a new tab
      .and('have.attr', 'rel', 'nonopener noreferrer')

    // Cypress can't control new browser tabs, so remove target attribute before clicking
    // This forces the link to open in the same tab so Cypress can verify the URL
    cy.get('a[href="https://www.ninjaone.com/freetrialform/"]').invoke('removeAttr', 'target').click()

    // Assert that after clicking the link, the URL includes the expected external URL path
    cy.url().should('include', '/freetrialform')
  })
})
