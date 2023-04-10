/// <reference types="cypress" />
///<reference types="cypress-iframe" />

// This file will contain tests for the Pricing page. Feel free to add as many as you want.

context('Pricing', () => {
    beforeEach(() => {
        cy.setCookie('OptanonConsent', 'true', { log: false })
        cy.setCookie('OptanonAlertBoxClosed', 'true', { log: false })
        cy.visit('https://www.smartlook.com/pricing/?currencyCode=CZK')   
      

    })

    // Check prices of packages
    it('Check prices of each plan', () => {
        cy.frameLoaded('#pricing-page-iframe', {timeout: 30000}).should('be.visible')
        cy.enter('#pricing-page-iframe').then(getBody => {
            getBody().get('h5').contains('Free plan')
            .next().should('contain.text', 'Start-up your business')
            .parent().next().next()
            .find('h2').should('have.text', 'Free')
        })
    })


    // Test that 'Build a plan' button works and the modal is behaving as expected - prices and limits

    // Feel free to modify this file and other files to you liking except the url.
})
