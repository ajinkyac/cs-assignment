/// <reference types="cypress" />

describe('Grid - select all feature', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/')
    });

    it('should select all rows', () => {
        // Select all checkbox
        cy.get('.datagrid').find('span').find('input').as('selectAllChkBox');
        // Span that shows 'Selected <number>'
        cy.get('.datagrid').find('span').as('displaySelections');
    
        cy.get('@selectAllChkBox').click()
    
        cy.get('@displaySelections').should('not.contain', 'None Selected');
    });

    it('should look for no row selection', () => {
        cy.get('.datagrid').find('span').as('displaySelections');

        cy.get('@displaySelections').should('contain', 'None Selected');
    });
});