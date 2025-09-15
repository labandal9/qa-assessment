/// <reference types="cypress" />

import { User } from '../support/types';
import {generateUser} from "../support/userFactory";

describe('User Registration and Login', () => {

    // Generate unique user data
    const newUser = generateUser();

    it('should register a new user and login', () => {


        // Registration page
        cy.visit('/signup');

        // Fill registration form
        cy.get('#full_name').type(newUser.full_name);
        cy.get('#email').type(newUser.email);
        cy.get('input[name="password"]').type(newUser.password);
        cy.get('input[name="confirm_password"]').type(newUser.password);
        cy.get('button[type="submit"]').click();

        // assert redirected to login page
        cy.url().should('include', '/login');

        // Login with new user
        cy.get('#username').type(newUser.email);
        cy.get('input[name="password"]').type(newUser.password);
        cy.get('button[type="submit"]').click();

        // Assert login success
        cy.contains('Dashboard').should('be.visible');
        cy.contains(`Hi, ${newUser.full_name}`).should('be.visible');
        cy.contains('Welcome back, nice to see you again!').should('be.visible');

    });

    it('should show error when fields are empty', () => {
        cy.visit('/signup')
        cy.get('button[type="submit"]').click()
        cy.contains('Full Name is required').should('be.visible')
        cy.contains('Email is required').should('be.visible')
        cy.contains('Password is required').should('be.visible')
        cy.contains('Password confirmation is required').should('be.visible')
    })

    it('should show error when email is ivalid', () => {
        cy.visit('/signup')
        cy.get('#full_name').type('Test User')
        cy.get('#email').type('invalidemail')  // wrong format
        cy.get('input[name="password"]').type('newUser.password!')
        cy.get('input[name="confirm_password"]').type('newUser.password!')
        cy.get('button[type="submit"]').click()
        // cy.wait(2000);
        cy.get('body').click(0,0);
        cy.contains('Invalid email address').should('be.visible')
    })

    it('should show error when password and confirmation do not match', () => {
        cy.visit('/signup');
        cy.get('#full_name').type(newUser.full_name);
        cy.get('#email').type(newUser.email);
        cy.get('input[name="password"]').type(newUser.password);
        cy.get('input[name="confirm_password"]').type('password');
        cy.get('button[type="submit"]').click()
        cy.contains('The passwords do not match').should('be.visible');
    })

    it('when password is less than 8 characters', () => {
        cy.visit('/signup');
        cy.get('input[name="password"]').type('1234567');
        cy.get('button[type="submit"]').click()
        cy.contains('Password must be at least 8 characters').should('be.visible');
    })

    it('should redirect to login page', () => {
        cy.visit('/signup');
        cy.get('a[href="/login"]').click()
        cy.url().should('include', '/login');
    })

});
