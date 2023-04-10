/// <reference types="cypress" />

class SignUpPageModel {
    mainText = () => cy.get('h1');
    textUnderH1 = () => cy.contains('h4', 'Create an account and receive a 30-day free trial with all premium features') ;
    trustedText = () => cy.contains('h4', 'Trusted by');
    buttonSignUpGoogle = () => cy.get('button#sign-google-login-button');
    buttonSignUpEmail = () => cy.get('button#sign-up-email');
    linkLogIn = () => cy.contains('div', 'Already have an account?').find('#sign-up_sign-in-link');
    emailPlaceholder = () => cy.contains('#sign-up-input-email--label', 'Work Email');
    emailField = () => cy.get('#sign-up-input-email--inner');
    passwordPlaceholder = () => cy.contains('#sign-up-input-password--label', 'Password');
    passwordField = () => cy.get('#sign-up-input-password--inner');
    passwordHideShow = () => cy.get('#sign-up-input-password--content > div[data-position="end"]').find('svg');
    passwordPopup = () => cy.contains('div', 'Password strength');
    buttonSubmit = () => cy.get('button#sign-up-submit-button');
    checkboxAcceptPolicy = () => cy.get('button#sign-up-checkbox-terms');
    linkTandC = () => cy.get('#sign-up_terms_terms-and-conditions-link');
    linkPrivacyPolicy = () => cy.get('#sign-up_terms_privacy-policy-link');
    erroremailmessage = () => cy.contains('[data-cy="email-input-helper"]', 'Please fill in your email address');
    popUpPassword = () => cy.contains('Password strength').parent().parent();
};


const passwordStrength = ['Weak', 'Medium', 'Strong'];
const passwordTips = {
    'A': 'Use at least 8 characters', 
    'B': 'Sequences like abc or 6543 are easy to guess', 
    'C': 'Straight rows of keys are easy to guess',
    'D': 'This is a very common password',
    'E': 'Common names and surnames are easy to guess',
    'F': 'This is similar to a commonly used password',
    'G': 'This is a top-10 common password',
    'H': 'Repeats like',
    'I': 'Short keyboard patterns are easy to guess',
    'J': 'Dates are often easy to guess'
};


function randString() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * 3) + 4;
    let newString = '';
  
    for (let i = 0; i < length; i++) {
      newString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return newString;
  };


const SignUpModel = new SignUpPageModel();

export {SignUpModel, passwordStrength, passwordTips, randString};
