// Routing and traversal

describe('Application Routing and Components', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('clicking on links in header should work', () => {
    // Click link with text 'Books'
    cy.get('a').contains('Books').click();
    cy.url().should('include', '/books');

    // Click link with text 'Home'
    cy.get('a').contains('Home').click();
    cy.url().should('include', '/');
  });

  it('traversing the whole page', () => {
    // Go to books
    cy.get('a').contains('Books').click();

    // Click link where the href contains `/book/`
    cy.get("a[href*='/book/']").first().click();
    cy.url().should('include', '/book/');
    cy.get('p').contains('Reviews');

    // Click profile link
    cy.get("a[href*='/profile']").click();
    cy.url().should('include', '/profile');
    cy.get('h2').contains('Your Reviews');

    // Click logo link
    cy.get("a[aria-label='Go to home page']").click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}`);
  });
});
