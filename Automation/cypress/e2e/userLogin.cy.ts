import { User } from "../support/types";
import { generateUser } from "../support/userFactory";

describe('User Login / Authentication', () => {

    // Before each login test, visit the login page
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should login successfully with valid credentials', () => {
        let newUser: User;

        // generate a new user
        newUser = generateUser();

        // create the user via API
        cy.createUser(newUser).then((createdUser) => {
            newUser.id = createdUser.id;
        });

        cy.get('input[name="username"]').type(newUser.email);
        cy.get('input[name="password"]').type(newUser.password);
        cy.get('button[type="submit"]').click();

        cy.contains('Dashboard').should('be.visible');
        cy.contains(`Hi, ${newUser.full_name}`).should('be.visible');
        cy.contains('Welcome back, nice to see you again!').should('be.visible');
    });

    it('should not submit empty login form', () => {
        cy.get('button[type="submit"]').click();
        cy.contains('Username is required').should('be.visible'); // it should normally be email not username a bug in the app
        cy.contains('Password is required').should('be.visible');
    });

    it('should toggle password visibility when clicking the toggle button', () => {
        cy.get('input[name="password"]').type('Password123!');
        // assert initial type is password
        cy.get('input[name="password"]').should('have.attr', 'type', 'password');

        // click toggle button → password should become visible
        cy.get('button[aria-label="Toggle password visibility"]').click();
        cy.get('input[name="password"]').should('have.attr', 'type', 'text');

        // click toggle button again → password should become hidden
        cy.get('button[aria-label="Toggle password visibility"]').click();
        cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    });


    describe('Password Recovery Page', () => {
        beforeEach(() => {
            cy.get('a[href="/recover-password"]').click();
        });

        it('should redirect to recover password page', () => {
            cy.url().should('include', '/recover-password');
            cy.contains('Password Recovery').should('be.visible');
        });

        it('should display recovery instructions', () => {
            cy.contains('A password recovery email will be sent to the registered account.').should('be.visible');
        });

        it('should have email input and submit button visible and clickable', () => {
            cy.get('input#email').should('be.visible').and('not.be.disabled');
            cy.get('button[type="submit"]').should('be.visible').and('not.be.disabled');
        });
    });
});
