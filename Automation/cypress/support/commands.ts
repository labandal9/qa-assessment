import { User } from './types';

Cypress.Commands.add('getAdminToken', (): Cypress.Chainable<string> => {
    return cy.request({
        method: 'POST',
        url: 'http://localhost:8000/api/v1/login/access-token',
        form: true,
        body: {
            username: Cypress.env('ADMIN_EMAIL') || 'admin@example.com',
            password: Cypress.env('ADMIN_PASSWORD') || 'changethis',
        },
    }).its('body.access_token');
});

Cypress.Commands.add(
    'createUser',
    (user: User): Cypress.Chainable<User & { id?: string }> => {
        return cy.getAdminToken().then((token) => {
            return cy.request({
                method: 'POST',
                url: 'http://localhost:8000/api/v1/users/',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: user,
            }).then((response) => {
                expect(response.status).to.eq(200);
                return response.body;
            });
        });
    }
);
