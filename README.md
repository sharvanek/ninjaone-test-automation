# 🧪 NinjaOne Test Automation (Cypress)

This repository contains an automated end-to-end (E2E) test suite for the [NinjaOne](https://www.ninjaone.com/) web application, built with [Cypress](https://www.cypress.io/). It focuses on testing login functionality, input validation, session persistence, and error handling. Tests run locally or via CI using GitHub Actions.

---

## ⚙️ Environment Setup

Test configuration is dynamically loaded based on the environment (e.g., `dev`, `qa`, etc.) via JSON files in the `config/` folder and/or environment variables.

### Config File (Required for Local Runs)

Create a file like `config/env.dev.json`:

```json
{
  "baseUrl": "https://example.com",
  "LOGIN_URL": "https://example.com/auth/#/login",
  "username": "valid.user@example.com",
  "password": "SuperSecret123!"
}
```

### Environment Variable Overrides (CI-Friendly)

You can override any of the above with environment variables:

- `CYPRESS_BASE_URL`
- `CYPRESS_LOGIN_URL`
- `CYPRESS_USERNAME`
- `CYPRESS_PASSWORD`

These are injected automatically in GitHub Actions using repository secrets.

## 📁 Project Structure
```
.
├── config/                  # Environment JSON files (e.g., env.dev.json)
├── cypress/
│   ├── fixtures/
│   └── support/
├── tests/
│   ├── ui/
│   └── e2e/
│       └── login.cy.js      # Login-related test specs
├── .github/
│   └── workflows/
│       └── cypress.yml      # GitHub Actions workflow
├── cypress.config.js        # Cypress config with dynamic env loader
└── README.md                # Project documentation
```

## 🚀 Running Tests Locally

1. Install Dependencies
```bash
npm install
```

2. Run Tests Using Dev Environment
```bash
TEST_ENV=dev npx cypress run
```

Or open Cypress UI to run/debug interactively:
```bash
npx cypress open
```

## 🤖 CI with GitHub Actions

Tests are run automatically on:

- Push to the `main` branch  
- Pull Requests

### 🧭 Manual Trigger

You can also manually trigger the workflow from the GitHub Actions UI:

1. Go to the **Actions** tab of the repository.
2. Select the **Cypress** workflow.
3. Click the **Run workflow** button.
4. Choose a branch and click **Run** to start the tests.

## ✅ Test Coverage

The test suite covers:

- ✅ Successful login with valid credentials
- ❌ Login failure scenarios including:
  - Excessively long input values for email and password
  - Email blank, password filled
  - Password blank, email filled
  - Invalid email format with valid password
  - Completely invalid credentials
  - Valid email with invalid password
  - Passwords that:
     - Are shorter than 8 characters
     - Contain only lowercase letters
     - Contain only numbers
     - Contain only special characters
     - Include emojis
     - Include spaces
- Login with complex passwords
  - Passwords containing lowercase, uppercase, numbers, and special characters
- 🎨 Validation styling and error messages
- 🧪 Edge cases around input length limits
- Session persistence tests for "Keep me signed in" checkbox:
  - User remains logged in after page reload when "Keep me signed in" is checked
  - User remains logged in when revisiting the login page with "Keep me signed in" checked
  - User is logged out when "Keep me signed in" is not checked and session cookies/local storage are cleared
- Navigation tests for login page links:
  - Clicking Forgot your password? routes to the password reset page
  - Clicking Do not have an account? opens the free trial signup page in a new tab (handled in the same tab for testability)

### ⚠️ Known Caveats and Considerations

- Session persistence tests rely on Cypress behavior around cookies/local storage — simulating full browser close/open (e.g., new tab or browser restart) is limited within Cypress.
- Human verification challenges (like CAPTCHAs) encountered during tests need manual intervention or advanced bypass solutions not covered here.

### 🔐 Notes on Credentials

This test suite is prepared in advance of granted access to a valid account.

- The login tests currently use hardcoded credentials (especially the password) as placeholders.
- An account has been registered, but access is pending approval.
- Once valid credentials are provided, tests should be updated to use environment variables
  (e.g., `CYPRESS_USERNAME`, `CYPRESS_PASSWORD`) to improve security and ease of configuration.
- This approach ensures the test suite remains ready for immediate use when access is granted.
