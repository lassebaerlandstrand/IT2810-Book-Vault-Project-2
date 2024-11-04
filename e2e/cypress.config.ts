import { defineConfig } from 'cypress';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/project2',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
