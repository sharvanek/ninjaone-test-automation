# 🧪 NinjaOne Test Automation (Cypress)

This repository contains end-to-end (E2E) tests for the [NinjaOne](https://www.ninjaone.com/) web application using [Cypress](https://www.cypress.io/). The tests validate login functionality, input handling, and error scenarios. GitHub Actions is used for CI.

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

.
├── config/ # Environment JSON files (e.g., env.dev.json)
├── cypress/
│ ├── fixtures/
│ └── support/ 
├── tests/
│ └── ui/
│ └── e2e/
│ └── login.cy.js # Login-related test specs
├── .github/
│ └── workflows/
│ └── cypress.yml # GitHub Actions workflow for running tests
├── cypress.config.js # Cypress config with dynamic env loader
└── README.md # Project documentation
