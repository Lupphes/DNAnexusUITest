const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'cu7qsd',
  chromeWebSecurity: false,
  e2e: {
    specPattern: 'cypress/integration/**/*.test.ts',
    supportFile: 'cypress/support/index.js',
  },
})
