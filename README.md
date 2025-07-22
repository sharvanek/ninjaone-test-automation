# 🧪 NinjaOne Test Automation (Cypress)

This repository contains an automated end-to-end (E2E) test suite for the [NinjaOne](https://www.ninjaone.com/) web application, built with [Cypress](https://www.cypress.io/). It focuses on testing login functionality, input validation, session persistence, and error handling. Tests run locally or via CI using GitHub Actions.

---

## 📁 Project Structure
This project structure is designed to showcase my thought process for building a well-organized and scalable test automation suite. While currently focused on Cypress and end-to-end tests, the organization can be easily adapted to support other testing frameworks and test types (e.g., unit, integration, API). The aim is to lay out a structure that facilitates maintainability, collaboration, and future expansion.
```
.
├── config/                  # Environment configuration files (e.g., env.dev.json)
├── cypress/
│   ├── fixtures/            # Fixtures for mocking API responses or test data
│ 
├── tests/                   # Test specs organized by type
│   ├── ui/                  # UI test suite (e.g., login, form validation)
│   └── e2e/                 # End-to-end (E2E) test specs
│       └── login.cy.js      # Login-related test specs
├── .github/
│   └── workflows/           # GitHub Actions CI/CD pipeline configuration
│       └── cypress.yml      # GitHub Actions workflow
├── cypress.config.js        # Cypress configuration file (including dynamic environment loading)
└── README.md                # Project documentation and setup guide
```

## 🚀 Running Tests Locally
To run the Cypress tests locally, follow the steps below:

### 1. Clone the Repository
Start by cloning the repository to your local machine.

```bash
git clone https://github.com/sharvanek/ninjaone-test-automation.git
cd ninjaone-test-automation
```

### 2. Install Dependencies
Next, install the necessary dependencies, including Cypress.

```bash
npm install
```

### 3. Environment Setup

To run tests locally, you need to set up the configuration file for the environment.

#### Copy the Template:
Copy the `config/env.template.json` file to `config/env.dev.json`. This will be your configuration template for local development.

```bash
cp config/env.template.json config/env.dev.json
```

#### Edit the Config File:
Open config/env.dev.json and provide the correct values for the following variables:

- "baseUrl": Your base application URL.
- "loginUrl": The login page URL.
- "username": A valid username/email.
- "password": A valid password.

#### Environment Variable Overrides (CI-Friendly)

You can override any of the above with environment variables:

- `CYPRESS_BASE_URL`
- `CYPRESS_LOGIN_URL`
- `CYPRESS_USERNAME`
- `CYPRESS_PASSWORD`

These are injected automatically in GitHub Actions using repository secrets.

### 4. Run the Tests

#### Option 1: Running Tests Headlessly (CLI)
You can run the tests in headless mode (without the Cypress UI) using the following command:
```bash
npx cypress run
```
#### Option 2: Running Tests with Cypress UI (Interactive Mode)
If you prefer to run the tests interactively and view the Cypress UI, use this command:
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
2. Select the **Run Cypress Tests** workflow.
3. Click the **Run workflow** dropdown.
4. Choose a branch and click **Run workflow** to start the tests.

## ✅ Test Coverage

The test suite covers:

- Successful login with valid credentials
- Login failure scenarios including:
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
- Validation styling and error messages
- Edge cases around input length limits
- Session persistence tests for "Keep me signed in" checkbox:
  - User remains logged in after page reload when "Keep me signed in" is checked
  - User remains logged in when revisiting the login page with "Keep me signed in" checked
  - User is logged out when "Keep me signed in" is not checked and session cookies/local storage are cleared
- Navigation tests for login page links:
  - Clicking Forgot your password? routes to the password reset page
  - Clicking Do not have an account? opens the free trial signup page in a new tab (handled in the same tab for testability)
 
## 🛠️ Tests Considered but Not Yet Automated

- SQL injection attempts to verify input sanitization
- JavaScript injection to test for XSS vulnerabilities
- Account lockout behavior after multiple failed login attempts (blocking specific user accounts temporarily)
- Rate limiting to control the frequency of login attempts or requests overall (usually by IP) to prevent abuse and brute-force attacks
- Verification that the login URL uses HTTPS and is securely hosted
- Accessibility checks for compliance with standards
- Confirming error messages clear when input fields are edited
- Handling of trailing and leading whitespace in input fields
- Testing email case sensitivity (e.g., mixed case emails)
- Multi-factor authentication (MFA) workflows
- Different user types (e.g., MSP vs. non-MSP)

## 🖐️ Manual Testing Recommendations

- **Visual/UI inspections:** Subtle UI issues like layout inconsistencies, font rendering, and color contrasts often need human judgment.
- **Accessibility:** While some automated checks exist, comprehensive accessibility testing (e.g., screen reader behavior) is best performed manually.
- **Session persistence:** Tests involving session persistence (e.g., keeping the user logged in after a browser restart or system reboot) are best done manually, as Cypress cannot fully replicate these scenarios.
- **SQL injection and JavaScript injection:** Security testing for vulnerabilities such as SQL injection or XSS attacks is best performed manually or with specialized security tools.
- **Performance testing:** Load, stress, and performance testing generally require dedicated tools and manual setup beyond typical E2E tests.

### ⚠️ Known Caveats and Considerations

- Cypress cannot simulate a full browser restart (limiting realistic session tests).
- The login page shows a “Human Verification” error during Cypress tests because the backend detects automated traffic. Resolving this is outside the scope of this repository.
- Cypress supports testing on Chromium-based browsers (Chrome, Edge, Electron) and Firefox, but does not fully support Safari or Internet Explorer, limiting cross-browser testing coverage.


### 🔐 Notes on Credentials and Test Assumptions

- This test suite was developed **before access was granted** to a valid NinjaOne account.
- The **Password Reset Page** and **Trial Signup Page** were not explicitly tested as they were assumed to be out of scope based on the provided instructions, which focused only on testing the login page. However, it was verified that the links to these pages are accessible from the login page and can be reached via clicking the respective links ("Forgot your password?" and "Do not have an account?").
- Some tests use **hardcoded usernames and passwords** as placeholders, which are expected to work once a real account is available.
- In a real environment, **all sensitive data** (e.g., usernames, passwords) should be supplied via **environment variables** and **GitHub Secrets** for security and flexibility.
- Several test assumptions were made about the application’s behavior, including:
  - Password complexity requirements,
  - Landing Page Post-Login,
  - Error message formats, and more.
- These assumptions should be verified and updated once access to an active account is provided.
