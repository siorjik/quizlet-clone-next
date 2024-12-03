import { toastStyles } from '../constants'

describe('create password', () => {
  it('should create password with invalid token - fail', () => {
    cy.visit('/create-password?token=invalidToken')
    cy.get('[name="password"]').type('12345')
    cy.get('[name="confirmPassword"]').type('12345')
    cy.get('[type="submit"]').click()
    cy.get(toastStyles.error).should('be.visible')
  })
})
