// addExpensiveTVsToBasketE2E.test.ts created with Cypress
//

/// <reference types="cypress" />

context('Assertions', () => {
    beforeEach(() => {
        cy.visit('https://czc.cz/');
        cy.clearCookies();
      })

    it('Navigate to TVs category. Add two most expensive TVs to the shopping cart', () => {

        // Arrage 
        let itemsOnPage = 27;
        let addedToBasket = 0;
        let sumPrice = "4 339 980 Kč";

        // Act
        cy.get('.main-menu .main-menu__title').contains('TV').should('be.visible').click(); // Not best practise, but there is no other identitication
        cy.get('.main-menu__submenu a').contains('Televize').should('be.visible').click();

        
        cy.url().should('include', '/televize/produkty');

        cy.intercept('POST', '/dwr/call/plaincall/ProductListDwr.updateProductList.dwr').as('getItems')
            cy.get('.navigation .order-by a').contains('Nejdražší').should('be.visible').click();
        cy.wait('@getItems')

        cy.get('#basket-preview a').should('have.class', 'empty');
        
        cy.get('#tiles div.new-tile').should('be.visible').should('have.length', itemsOnPage).each(($el, index) => {
            cy.wrap($el).within(() => {
                 cy.get('button').invoke('attr', 'data-buy-mode').then(status => {
                    if (status === 'normal') {
                        cy.get('button').should('be.visible').click();   
                        addedToBasket++;

                        cy.document().its('body').find('#basket-preview a').should('not.have.class', 'empty');
                        cy.document().its('body').find('.count').should('to.contain', addedToBasket);
                        cy.document().its('body').find('.buy-mode-product__item').contains('Pokračovat').should('be.visible').click();
                    }
                });
            })
            if (index === 2) {
                return false;
            }
        })

        cy.get('#basket-preview .money-part').contains(sumPrice);
    })
})