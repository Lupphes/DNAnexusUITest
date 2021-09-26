// add-expensive-tvs-to-basket.ts created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />


context('Assertions', () => {
    beforeEach(() => {
        cy.visit('https://czc.cz/');
        cy.clearCookies();
      })

    it('Navigate to TVs category. Add two most expensive TVs to the shopping cart', () => {
        cy.get('.main-menu__title').contains('TV, audio, foto').click();
        cy.get('.main-menu__submenu a').contains('Televize').click();

        cy.url().should('include', '/televize/produkty');

        cy.intercept('POST', '/dwr/call/plaincall/ProductListDwr.updateProductList.dwr').as('getItems')
            cy.get('.nav-tile-switch a').contains('Nejdražší').click();
        cy.wait('@getItems')
        
        cy.get('#tiles div.new-tile').each(($el, clicked = 0) => {
            cy.wrap($el).within(() => {
                cy.get('button').invoke('attr', 'data-buy-mode').then((status) => {
                    if (status === "normal") {
                        cy.get('button').click();   
                        clicked += 1;
                        
                        cy.document().its('body').find('.buy-mode-product__item').contains('Pokračovat').click();
                    }
                });
            })
            if (clicked === 2) {
                return false;
            }
        })
    })
})