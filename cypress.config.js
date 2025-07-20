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
      // implement node event listeners here
      const env = process.env.TEST_ENV || 'dev'
      const envConfig = loadEnvConfig(env)

      config.baseUrl = envConfig.baseUrl
      config.env = { ...config.env, ...envConfig }

      return config
    },
    specPattern: 'tests/ui/e2e/**/*.cy.js', // your test file pattern
  },
});
