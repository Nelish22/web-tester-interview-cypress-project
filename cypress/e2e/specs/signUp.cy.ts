
/// <reference types="cypress" />

// This file will contain tests for the sign up form. Feel free to add as many as you want.
import {SignUpModel, randString} from '../../support/signUpPOM.cy';


context('Sign up', () => {
    beforeEach(() => {
        cy.visit('/sign/up');
    });

    // Test sign up form
    it('Check visibility of sections on page', () => {
        cy.url().should('contain', '/sign/up');
        cy.title().should('eq', 'Smartlook');
        SignUpModel.mainText().should('be.visible')
        .and('have.text', 'Get started with Smartlook');
        SignUpModel.textUnderH1().should('be.visible')
        .and('have.text', 'Create an account and receive a 30-day free trial with all premium features');
        SignUpModel.buttonSignUpGoogle().should('be.visible')
        .and('have.text', 'Sign up with Google');
        SignUpModel.buttonSignUpEmail().should('be.visible')
        .and('have.text', 'Sign up with Email');
        SignUpModel.linkLogIn().should('be.visible')
        .and('have.attr', 'href', '/sign/in');
        SignUpModel.trustedText().should('be.visible')
        .next().children().should('be.visible')
        .and('have.length', 6);
    });


    it('Click on Google and Email sign up button', () => {
        SignUpModel.buttonSignUpGoogle().click();        // no sure, how to manage new tab yet
        SignUpModel.buttonSignUpEmail().click();
        cy.url().should('contain', '/sign/up');
        SignUpModel.emailField().should('be.visible');
        SignUpModel.emailPlaceholder().should('be.visible');
        SignUpModel.passwordField().should('be.visible');
        SignUpModel.passwordPlaceholder().should('be.visible');
        SignUpModel.checkboxAcceptPolicy().parent().parent()
        .should('be.visible');
        SignUpModel.buttonSubmit().should('be.visible')
        .and('have.text', 'Sign up with email');
    });


    it('Test cases for Sign Up', () => {
        SignUpModel.buttonSignUpEmail().click();
        
        cy.log('**Test Submit button with no credentials & not-checking Privacy policy**');
        SignUpModel.buttonSubmit().click();
        SignUpModel.erroremailmessage().should('be.visible');

        const strongPass = randString() + randString() + randString()
        cy.log('**Test Submit with correct format of email & strong password & not-checking Privacy policy**')
        cy.fillCredentials(
            {username: randString() + '@test.com', 
            password: strongPass});
        SignUpModel.emailField().should('be.visible')
        .should('contain.value', 'test.com');
        cy.checkPasswordPopup({
            pass: strongPass, 
            pStrength: 2, 
            pTips: 'A'    
        });
        SignUpModel.buttonSubmit().click();
        cy.url().should('contain', '/sign/up')

        cy.log('**Test Submit with correct format of email & short password**');
        cy.clearFields()
        cy.fillCredentials(
            {username: randString() + '@test.com', 
            password: 'a'});
        SignUpModel.emailField().should('be.visible')
        .should('contain.value', 'test.com');
        cy.checkPasswordPopup({
            pass: 'a', 
            pStrength: 0, 
            pTips: 'A'    
        });
        SignUpModel.checkboxAcceptPolicy().click()
        SignUpModel.buttonSubmit().click();
        cy.url().should('contain', '/sign/up')

        cy.log('**Test Submit with correct format of email & repeated chars less then 8 for password**')
        cy.clearFields()
        cy.fillCredentials(
            {username: randString() + '@test.com', 
            password: 'asdf'});
        cy.checkPasswordPopup({
            pass: 'asdf', 
            pStrength: 0, 
            pTips: 'D'
        });
        SignUpModel.checkboxAcceptPolicy().click()
        SignUpModel.buttonSubmit().click();
        cy.url().should('contain', '/sign/up')

        cy.log('**Test Submit with correct format of email & repeated chars more then 8 for password**')
        cy.clearFields()
        cy.fillCredentials(
            {username: randString() + '@test.com', 
            password: 'asdasdasd'});
        cy.checkPasswordPopup({
            pass: 'asdasdasd', 
            pStrength: 0, 
            pTips: 'H'
        });
        SignUpModel.checkboxAcceptPolicy().click()
        SignUpModel.buttonSubmit().click();
        cy.url().should('contain', '/sign/up')

        const string = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        cy.log('**Test Submit with correct format of email & really long password**')
        cy.clearFields()
        cy.fillCredentials(
            {username: randString() + '@test.com', 
            password: (string)});
        cy.checkPasswordPopup({
            pass: string, 
            pStrength: 0, 
            pTips: 'H'              // Tips don't show what is maximal length
        });
        SignUpModel.checkboxAcceptPolicy().click()
        SignUpModel.buttonSubmit().click();
        cy.url().should('contain', '/sign/up')

        cy.log('**Test Submit with correct format of email & strong password & checked Privacy Policy**')
        cy.intercept('GET', 'https://eu.api-gateway.alfa.smartlook.cloud/settings/api/v4.0/organizations/**').as('reloadUrl');
        cy.clearFields()
        cy.fillCredentials(
            {username: randString() + '@test.com', 
            password: strongPass});
        SignUpModel.emailField().should('be.visible')
        .should('contain.value', 'test.com');
        cy.checkPasswordPopup({
            pass: strongPass, 
            pStrength: 2, 
            pTips: 'A'    
        });
        SignUpModel.checkboxAcceptPolicy().click()
        .should('have.attr', 'aria-checked', 'true');
        SignUpModel.buttonSubmit().click();
        SignUpModel.buttonSubmit().find('[class*=sui-c-iehSfZ]')
        .should('be.visible').wait('@reloadUrl');       
        cy.url().should('contain', '/sign/confirm-email')
    })
    // To finish this testing, all the options for Weak password should be tested (names, characters near itself on keyboard,
    // only numbers, dates, common passwords like "password123", also submit with medium strength password, reload page after filling fields, etc.)
});