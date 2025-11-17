describe('Food app smoke', () => {
  it('loads and adds item', () => {
    cy.visit('/');
    cy.get('input[placeholder="Name"]').type('TestFood');
    cy.get('input[placeholder="Category"]').type('TestCat');
    cy.get('button').contains('Add').click();
    cy.contains('TestFood');
  });
});
