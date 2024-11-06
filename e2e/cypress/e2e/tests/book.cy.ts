describe('Single Book Page', () => {
  beforeEach(() => {
    cy.visit('/book/3263607-the-fellowship-of-the-ring');
  });

  it('should display correct information', () => {
    cy.get('header').should('be.visible');
    cy.get('h1').contains('The Fellowship of the Ring').should('be.visible');
    cy.get('.mantine-Text-root').contains('J.R.R. Tolkien').should('be.visible');
    cy.get('.mantine-Text-root').contains('9780345015339').should('be.visible');
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
