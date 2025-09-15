// cypress/support/index.d.ts
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Get an admin token
         */
        getAdminToken(): Chainable<string>;

        /**
         * Create a new user via API
         * @param user User object containing username, email, password...
         */
        createUser(user: any): Chainable<any>;
    }
}
