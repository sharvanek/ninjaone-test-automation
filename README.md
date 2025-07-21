🧪 NinjaOne Test Automation (Cypress)
This repository contains end-to-end (E2E) tests for the NinjaOne web application, built using the Cypress framework. Tests validate login workflows, edge cases, and negative scenarios using dynamic environment configs and GitHub Actions for CI.

⚙️ Configuration
This project supports dynamic environment-based configuration using .json files and environment variables.

🔧 How It Works
Cypress reads the TEST_ENV variable to load the correct config file:

arduino
Copy
Edit
config/env.<ENV>.json
Each config file should define:

json
Copy
Edit
{
  "baseUrl": "https://example.com",
  "LOGIN_URL": "https://example.com/auth/#/login",
  "username": "valid.user@example.com",
  "password": "SuperSecret123!"
}
You can override any of these using environment variables (e.g., from GitHub Secrets):

CYPRESS_BASE_URL

CYPRESS_LOGIN_URL

CYPRESS_USERNAME

CYPRESS_PASSWORD

📁 Project Structure
bash
Copy
Edit
.
├── config/
│   └── env.dev.json             # Example config file for 'dev' environment
├── cypress/
│   └── screenshots/             # Cypress screenshots on failure
│   └── videos/                  # Cypress test run videos
├── tests/
│   └── ui/
│       └── e2e/
│           └── login.cy.js      # Main test cases
├── .github/
│   └── workflows/
│       └── cypress.yml          # GitHub Actions workflow
├── cypress.config.js            # Cypress config with dynamic env support
└── README.md
🚀 Getting Started
1. Install Dependencies
bash
Copy
Edit
npm install
2. Add an Environment Config File
Create a file like config/env.dev.json with your environment-specific test credentials and base URLs.

3. Run Tests Locally
Open Cypress Test Runner (GUI)
bash
Copy
Edit
npx cypress open
Run Cypress Headlessly (CLI)
bash
Copy
Edit
TEST_ENV=dev npx cypress run
🤖 GitHub Actions (CI)
This repo includes a GitHub Actions workflow that runs your Cypress tests automatically:

On push to the main branch

On pull requests

✅ Manually triggered (see below)

▶️ Manually Running Tests
You can trigger tests manually using GitHub's workflow_dispatch feature:

Go to the Actions tab in your GitHub repository.

Click the Cypress workflow in the left sidebar.

Click the “Run workflow” dropdown in the top-right.

Select a branch and click Run.

Great for re-running tests without pushing new code.

🧪 Example Test Coverage
This test suite includes:

✅ Login success with valid credentials

❌ Login failure scenarios:

Blank fields

Invalid email format

Incorrect credentials

Excessively long inputs (email/password)

🚫 Graceful handling of form validation and error messaging

🔄 Input length and edge case validation (e.g., 128+ character password)

📄 License
This project is licensed under the MIT License.

