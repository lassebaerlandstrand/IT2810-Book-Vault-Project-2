describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display correct information', () => {
    cy.get('header').should('be.visible');
    cy.get('h1').contains('Welcome to');

    cy.get(':nth-child(1) > ._count_1d49w_35').should('not.contain', '. . .').contains(/\d+/); // Number of books
    cy.get(':nth-child(2) > ._count_1d49w_35').should('not.contain', '. . .').contains(/\d+/); // Number of authors
    cy.get(':nth-child(3) > ._count_1d49w_35').should('not.contain', '. . .').contains(/\d+/); // Number of ratings
  });

  it('random book function should redirect', () => {
    cy.contains('Try your luck with a random book').should('not.have.attr', 'data-loading'); // Wait for the button to be enabled
    cy.contains('Try your luck with a random book').click();

    cy.url().should('include', '/book/');
  });

  it('popular genres should redirect', () => {
    cy.contains('Drama').click();
    cy.url().should('include', '/books?genres=Drama');
  });
});
