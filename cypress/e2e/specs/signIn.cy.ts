/// <reference types="cypress" />

// This file will contain tests for the Sign In form. Feel free to add as many as you want.
// You dont have to test successful sign in as an account is needed for it. Other scenarios are recommended to test.

context('Sign in', () => {
    let cred = 'testing'

    beforeEach(() => {
        cy.visit('/sign/in')
    })

    // Test sign in form

    it('Check placeholders', () => {
        cy.get('#sign-in-input-email--label')
        .should('be.visible')
        .and('have.text', 'Email')
        cy.get('#sign-in-input-password--label')
        .should('be.visible')
        .and('have.text', 'Password')
    })

    it('Click Login button without credentials', () => {
        cy.get('#sign-in-button').click().then(() => {
            cy.get('#sign-in-input-email').next()
            .should('be.visible')
            .and('have.text', 'Please fill in your email address')
        })
    /* Suggestion: Both required fields for login 
    should have alert message if left empty */
    })

    it('Fill in only Email field with correct format', () => {
        cy.get('#sign-in-input-email--inner')
        .type('test@test.com')
        .should('have.value', 'test@test.com')
        cy.get('#sign-in-button').click().then(() => {
            cy.get('#sign-in-input-password').next()
            .should('be.visible')
            .and('have.text', 'Your password must be at least 6 characters long')
        })
    /* Suggestion: If password field left empty, message 
    may rather say something like "Please enter your password" */
    })

    it('Fill in Email with incorrect format', () => {
        cy.get('#sign-in-input-email--inner').type(cred)
        .should('have.value', 'testing')
        cy.get('#sign-in-button').click().then(() => {
            cy.get('#sign-in-input-email').next()
            .should('be.visible')
            .and('have.text', 'Please fill in your email address')
        })
    })

    it('Check visible/hidden password', () => {
        cy.get('#sign-in-input-password--inner').type(cred)
        .should('have.attr', 'type', 'password')
        .then(() => {
            cy.get('#sign-in-input-password--content')
            .children().eq(2).find('svg').click()
            cy.get('#sign-in-input-password--inner')
            .should('have.attr', 'type', 'text')
        })
    })
    
    it('Click on Sign up link', () => {
        cy.get('a#sign-in_sign-up-link')
        .should('be.visible')
        .and('have.text', 'Sign up')
        .click()
        cy.url().should('contain', 'sign/up')
        // should also check that at least all sections are visible
    })

    it('Click on I forgot my password', () => {
        cy.get('a#sign-in_forgot-password-link')
        .should('be.visible')
        .and('have.text', 'I forgot my password')
        .click()
        cy.url().should('contain', 'sign/reset-password')
        /* also check for visibility of all sections
        2 possible test cases:  enter valid email 
                                enter not registered email(or of deleted account)
        test return to Log in link */
    })

    it('Login via OAuth', () => {
        cy.get('button#sign-google-login-button')
        .should('be.visible').click()   // just test if button is clickable
        cy.get('button#sign-facebook-login')
        .should('be.visible').click()        // same + there is actually bug (black Not found page)
        cy.get('button#sign-sso-login-button')
        .should('be.visible').click()
        cy.url().should('contain', 'sign/sso')
    })

    // Feel free to modify this file and other files to you liking except the url.
})
