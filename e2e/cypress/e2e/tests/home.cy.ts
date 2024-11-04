describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display correct information', () => {
    cy.get('header').should('be.visible');
    cy.get('h1').contains('Welcome to');
  });

  it('random book function should redirect', () => {
    cy.contains('Try your luck with a random book').click();
    cy.url().should('include', '/book/');
  });
});
