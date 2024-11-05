describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display correct information', () => {
    cy.get('header').should('be.visible');
    cy.get('h1').contains('Welcome to');
  });

  it('random book function should redirect', () => {
    cy.contains('Try your luck with a random book').should('not.have.attr', 'data-loading'); // Wait for the button to be enabled
    cy.contains('Try your luck with a random book').click();

    cy.url().should('include', '/book/');
  });

  it('popular genres should redirect', () => {
    cy.contains('Drama').click();
    // cy.url().should('include', '/book?genre=Drama'); // TODO
  });
});
