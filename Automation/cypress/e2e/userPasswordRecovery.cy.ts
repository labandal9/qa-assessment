import { User } from "../support/types";
import { generateUser } from "../support/userFactory";

describe('User Password Recovery', () => {

    // Before each login test, visit the login page
    beforeEach(() => {
        cy.visit('/recover-password');
    });

    it('should recover password successfully', () => {
        let newUser: User;

        // generate a new user
        newUser = generateUser();

        // create the user via API
        cy.createUser(newUser).then((createdUser) => {
            newUser.id = createdUser.id;
        });

        cy.get('input[name="email"]').type(newUser.email);
        cy.get('button[type="submit"]').click();

        // assert toast appearing with correct message

        cy.get('div[data-scope="toast"][data-part="root"]')
            .should('be.visible')
            .within(() => {
                cy.get('div[data-part="title"]').should('contain.text', 'Success!');
                cy.get('div[data-part="description"]').should('contain.text', 'Password recovery email sent successfully.');
            });
        // assert toast disappears after 2s

        cy.get('div[data-scope="toast"][data-part="root"]', { timeout: 2500 })
            .should('not.exist');

        // assert the feild is emptied and the submit button is not disabled

        cy.get('input[name="email"]').should('have.value', '');
        cy.get('button[type="submit"]').should('not.be.disabled');
    });

    it('should show error toast when email does not exist', () => {
        const nonExistingEmail = 'notexist@mail.com';

        cy.get('input[name="email"]').type(nonExistingEmail);
        cy.get('button[type="submit"]').click();

        // assert error toast appears
        cy.get('div[data-scope="toast"][data-part="root"]')
            .should('be.visible')
            .within(() => {
                cy.get('div[data-part="title"]').should('contain.text', 'Something went wrong!');
                cy.get('div[data-part="description"]').should('contain.text', 'The user with this email does not exist in the system.');
            });

        // assert the field is not cleared and submit button is not disabled
        cy.get('input[name="email"]').should('have.value', nonExistingEmail);
        cy.get('button[type="submit"]').should('not.be.disabled');
    });

    it('should show error when email field is empty', () => {
        // make sure email field is empty
        cy.get('input[name="email"]').should('have.value', '');
        cy.get('button[type="submit"]').click();

        // assert message error
        cy.contains('Email is required').should('be.visible');

        cy.get('button[type="submit"]').should('not.be.disabled');
    });

});