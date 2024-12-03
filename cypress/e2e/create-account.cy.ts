import { toastStyles } from '../constants'

describe('create account', () => {
  it('should create account with existing email - fail', () => {
    cy.visit('/create-account')
    cy.get('[name="email"]').type(Cypress.env('email'))
    cy.get('[name="name"]').type('test')
    cy.get('[type="submit"]').click()
    cy.get(toastStyles.error).should('be.visible')
  })

  it('should create account - success', () => {
    cy.visit('/create-account')
    cy.get('[name="email"]').type('test@test.net')
    cy.get('[name="name"]').type('test')
    cy.get('[type="submit"]').click()
    cy.get(toastStyles.success).should('be.visible')
  })
})