import { defineConfig } from 'cypress';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/project2',
    defaultCommandTimeout: 10000,
  },
});
