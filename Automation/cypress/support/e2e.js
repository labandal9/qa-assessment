const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        supportFile: 'cypress/support/e2e.ts',
        specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
        baseUrl: 'http://localhost:8000'
    },
})
