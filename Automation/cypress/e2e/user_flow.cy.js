describe('User Registration and Login', () => {

    it('should register a new user and login', () => {

        // Registration page
        cy.visit('/signup')

        // Fill registration form
        const username = `user${Date.now()}`       // unique username
        const email = `test${Date.now()}@mail.com`
        const password = 'Password123!'
        const emaillog = `${email}`
        const usernamelog = `${username}`

        cy.get('#full_name').type(username)
        cy.get('#email').type(email)
        cy.get('input[name="password"]').type(password)
        cy.get('input[name="confirm_password"]').type(password)
        cy.get('button[type="submit"]').click()

        // assert URL changed to signup page
        cy.url().should('include', '/login');


        // Login with new user
        cy.get('#username').type(emaillog)
        cy.get('input[name="password"]').type(password)
        cy.get('button[type="submit"]').click()

        // Assert login success
        cy.contains('Dashboard').should('be.visible')
        cy.contains(`Hi, ${usernamelog}`).should('be.visible');
        cy.contains('Welcome back, nice to see you again!').should('be.visible');

    })

})
