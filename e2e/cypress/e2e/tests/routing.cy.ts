// Routing and traversal

describe('Application Routing and Components', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display fetching user', () => {
    cy.get('h1').contains('Fetching user data');
  });
});
