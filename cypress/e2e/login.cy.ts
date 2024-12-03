import { toastStyles } from '../constants'

describe('login', () => {
  it('should login with invalid credentials - fail', () => {
    cy.visit('/login')
    cy.get('[name="email"]').type('failed@test.net')
    cy.get('[name="password"]').type('failed test')
    cy.get('[type="submit"]').click()
    cy.get(toastStyles.error).should('be.visible')
  })

  it('should login - success', () => {
    cy.visit('/login')
    cy.get('[name="email"]').type(Cypress.env('email'))
    cy.get('[name="password"]').type(Cypress.env('password'))
    cy.get('[type="submit"]').click()
    cy.url().should('eq', `${Cypress.env('appUrl')}/home`)
    cy.getCookie('next-auth.session-token').should('be.exist')
    cy.get('#logout').click() // logout
    cy.contains('Improve your English!').should('be.visible')
    cy.getCookie('next-auth.session-token').should('not.exist')
  })
})