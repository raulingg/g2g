/// <reference types="Cypress" />
import { createSelector } from '../utils'

describe('Login Page', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/login')
  })

  it('Shows Login Through Google Button', () => {
    cy.url().should('include', '/login')
    cy.get(createSelector('google-auth-button')).should('exist')
  })

  it('logs in with the correct username and password', () => {
    cy.fixture('users/defaultTestingUser.json').then(user => {
      cy.get('input[name=email]').type(user.email)
      cy.get('input[name=password]').type(user.password)
      cy.get(createSelector('login-with-credentials-submit')).click()
      // Login form should disappear
      cy.get(createSelector('login-with-credentials-submit')).should(
        'not.exist'
      )
      // Logged in user should be displayed
      cy.url().should('match', /./)
      // Fill out login form
    })
  })
})
