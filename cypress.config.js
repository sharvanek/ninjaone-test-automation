const { defineConfig } = require("cypress");
const fs = require('fs')
const path = require('path')

function loadEnvConfig(envName) {
  const configPath = path.resolve('config', `env.${envName}.json`)

  if (!fs.existsSync(configPath)) {
    throw new Error(`Missing environment config file: ${configPath}`)
  }

  const configData = JSON.parse(fs.readFileSync(configPath))

  if (!configData.baseUrl) {
    throw new Error(
      `Missing required key "baseUrl" in ${configPath}. Please ensure it is defined.`
    )
  }

  return configData
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Determine environment (local or CI)
      const env = process.env.TEST_ENV || 'dev'

      // Load config file for environment (local/dev)
      let envConfig = {}
      try {
        envConfig = loadEnvConfig(env)
      } catch (err) {
        // Fail gracefully if config file missing locally
        console.warn(err.message)
      }

      // Override or supplement config with GitHub Secrets (env vars)
      // These come from GitHub Actions secrets injected as env variables
      const secretEnv = {
        baseUrl: process.env.CYPRESS_LOGIN_URL || envConfig.baseUrl,
        username: process.env.CYPRESS_USERNAME || envConfig.username,
        password: process.env.CYPRESS_PASSWORD || envConfig.password,
      }

      // Apply baseUrl and env variables for Cypress config
      config.baseUrl = secretEnv.baseUrl
      config.env = { ...config.env, ...envConfig, ...secretEnv }

      return config
    },
    specPattern: 'tests/ui/e2e/**/*.cy.js',
  },
});
