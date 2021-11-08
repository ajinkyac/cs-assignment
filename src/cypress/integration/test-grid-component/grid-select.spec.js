/// <reference types="cypress" />

describe('Grid - select few rows', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/')
    });

    it('should select some rows and check indeterminate state', () => {
        // Reference first two rows in the grid
        cy.get('input[data-testid=rowSelector0]').click();
        cy.get('input[data-testid=rowSelector1]').click();

        cy.get('input[data-testid=selectAllChkBox]').should('have.class', 'indeterminate');
    });

    it('should select row with available status and check visibility of download button', () => {
        // Reference row with available status in the grid
        cy.get('input[data-testid=rowSelector1]').click();

        cy.get('button[class=download]').should('not.be.disabled');
    });
});