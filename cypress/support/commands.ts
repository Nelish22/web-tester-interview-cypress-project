/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import 'cypress-iframe';
import { SignUpModel, passwordStrength, passwordTips } from './signUpPOM.cy';


interface FillCredentialsOptions {
    username: string;
    password: string;
  };
  
  declare global {
    namespace Cypress {
      interface Chainable<Subject> {
        fillCredentials(options: FillCredentialsOptions): Chainable<Subject>;
      }
    }
  };
  
  Cypress.Commands.add('fillCredentials', (options: FillCredentialsOptions) => {
    cy.get('#sign-up-input-email--inner').type(options.username)
    .should('have.value', options.username);
    cy.get('#sign-up-input-password--inner').type(options.password)
    .should('have.value', options.password);
  });
  

interface checkPasswordPopupOptions {
    pass: string;
    pStrength: number;
    pTips: string
  };
  
  declare global {
    namespace Cypress {
      interface Chainable<Subject> {
        checkPasswordPopup(options: checkPasswordPopupOptions): Chainable<Subject>;
      }
    }
  };

  Cypress.Commands.add('checkPasswordPopup', (options) => {
    const { pass, pStrength, pTips } = options;
    SignUpModel.passwordField().should('be.visible')
    .should('have.value', pass)
    .and('have.attr', 'type', 'password');
    SignUpModel.popUpPassword()
    .should('contain.text', passwordStrength[pStrength])
    .and('contain.text', passwordTips[pTips]);
});

declare global {
    namespace Cypress {
      interface Chainable<Subject> {
        clearFields(): Chainable<Subject>;
      }
    }
  };
  
  Cypress.Commands.add('clearFields', () => {
    SignUpModel.emailField().clear();
    SignUpModel.passwordField().clear();
  });