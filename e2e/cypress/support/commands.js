// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { getTestUserId } from '../utils/getTestUserId';

// Overwrite the default `visit` command to set the localStorage to the test user
Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
  const defaultOptions = {
    onBeforeLoad: (window) => {
      window.localStorage.setItem('userID', getTestUserId());

      if (options.onBeforeLoad) {
        options.onBeforeLoad(window);
      }
    },
  };

  const mergedOptions = { ...options, ...defaultOptions };

  return originalFn(url, mergedOptions);
});
