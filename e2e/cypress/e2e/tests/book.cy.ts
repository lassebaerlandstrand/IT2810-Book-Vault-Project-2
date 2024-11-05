describe('Single Book Page', () => {
  beforeEach(() => {
    cy.visit('/book/2767052-the-hunger-games');
  });

  it('should display correct information', () => {
    cy.get('header').should('be.visible');
    cy.get('h1').contains('The Hunger Games');
    cy.get('.mantine-Text-root').contains('Suzanne Collins');
    cy.get('.mantine-Text-root').contains('9780439023481');
    cy.get('.mantine-Rating-root').should('be.visible');
    cy.get('.mantine-Spoiler-control').click();
  });

  it('reviews should work', () => {
    cy.get('.mantine-Text-root').contains('Reviews');
    cy.get('button[aria-label="Give Review"]').click();
    cy.get('textarea').type(
      'This is a test review, performed by a e2e test. This review will be cancelled and not posted.',
    );
    cy.get('button[aria-label="Cancel Review"]').click(); // Cancel review, as we don't want to spam the database in case it is not run locally
  });

  it('should be able to load more reviews', () => {
    cy.get('[data-testid="review-stack"]').find('> * > .mantine-Grid-col').should('have.length', 3);
    cy.get('button').contains('Load more').click();
    cy.get('[data-testid="review-stack"]').find('> * > .mantine-Grid-col').should('have.length', 6);
  });
});
