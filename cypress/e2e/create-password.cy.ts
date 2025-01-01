import { toastStyles } from '../constants'

describe('create password', () => {
  it('should create password with invalid token - fail', () => {
    cy.intercept('POST', '/create-password?token=expiredToken',
      {
        headers: { 'content-type': 'text/x-component' },
        body: `0:["$@1",["development",null]]\n1:{"serverError":"Sorry, this link was expired..."}\n`
      }
    ).as('createPassword')

    cy.visit('/create-password?token=expiredToken').wait(500)
    cy.get('[name="password"]').type('12345')
    cy.get('[name="confirmPassword"]').type('12345')
    cy.get('[type="submit"]').click()
    cy.get(toastStyles.error).should('be.visible')
  })

  it('should create password - success', () => {
    cy.intercept('POST', '/create-password?token=validToken',
      {
        headers: { 'content-type': 'text/x-component' },
        body: `0:["$@1",["development",null]]\n1:{"data":{"success":true}}\n`
      }
    ).as('createPassword')

    cy.visit('/create-password?token=validToken').wait(500)
    cy.get('[name="password"]').type('12345')
    cy.get('[name="confirmPassword"]').type('12345')
    cy.get('[type="submit"]').click()
    cy.get(toastStyles.success).should('be.visible')
  })
})
