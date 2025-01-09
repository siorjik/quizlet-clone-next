import { toastStyles } from '../constants'

describe('create account', () => {
  it('should create account with existing email - fail', () => {
    cy.intercept('POST', '/create-account', {
      headers: { 'content-type': 'text/x-component' },
      body: `0:["$@1",["development",null]]\n1:{"serverError":"The user with this email is exist"}\n`
    }).as('createUser')

    cy.visit('/create-account').wait(500)
    cy.get('[name="email"]').type(Cypress.env('email'))
    cy.get('[name="name"]').type('test')
    cy.get('[type="submit"]').click()
    cy.get(toastStyles.error).should('be.visible')
  })

  it('should create account - success', () => {
    cy.intercept('POST', '/create-account', {
      headers: { 'content-type': 'text/x-component' },
      body: `0:["$@1",["development",null]]\n1:{"data":{"success":true}}\n`
    }).as('createUser')
    
    cy.visit('/create-account').wait(500)
    cy.get('[name="email"]').type('test@test.net')
    cy.get('[name="name"]').type('test')
    cy.get('[type="submit"]').click()
    cy.get(toastStyles.success).should('be.visible')
  })
})