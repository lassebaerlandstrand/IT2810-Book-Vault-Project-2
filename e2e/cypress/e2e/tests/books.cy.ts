describe('Books Page', () => {
  beforeEach(() => {
    cy.visit('/books');
  });

  it('should display correct information', () => {
    cy.get('header').should('be.visible');
    cy.get("a[href*='/book/']").should('have.length.greaterThan', 0);
  });

  it('changing the number of entries should work', () => {
    // Select 10 entries
    cy.get('[data-testid="entries-select"]').click();
    cy.get('.mantine-Select-options').contains('10').click();
    cy.get("a[href*='/book/']").should('have.length', 10);

    // Select 25 entries
    cy.get('[data-testid="entries-select"]').click();
    cy.get('.mantine-Select-options').contains('25').click();
    cy.get("a[href*='/book/']").should('have.length', 25);
  });

  it('pagination should work', () => {
    // Start on page 1
    cy.get('[data-active="true"]').contains('1');

    // Click on page 2
    cy.get('.mantine-Pagination-root').contains('2').click();
    cy.get('[data-active="true"]').contains('2');
    cy.url().should('include', 'page=2');
  });

  it('searching for a book should work', () => {
    // Search for the hunger games
    cy.wait(1000); // If we search immediately, the initial queries will be cancelled, and cypress will still say it is waiting for the cancelled queries
    cy.get('input[placeholder="Search for books"]').type('The Hunger Games{enter}');

    cy.get('h4').contains('The Hunger Games');
    cy.get("[title='Suzanne Collins']").should('be.visible');
  });

  it('filtering by genre should work', () => {
    // Filter by drama
    cy.get('button').contains('Drama').click();
    cy.url().should('include', 'genres=Drama');
    cy.get('h4').contains('Drama');
  });
});
