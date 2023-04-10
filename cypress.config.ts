import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  pageLoadTimeout: 60000,
  responseTimeout: 30000,
  waitForAnimations: true,
  includeShadowDom: true,
  e2e: {
    baseUrl: 'https://app.alfa.smartlook.cloud',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})