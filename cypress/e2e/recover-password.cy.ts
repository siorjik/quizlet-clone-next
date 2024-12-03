import { toastStyles } from '../constants'

describe('recover password', () => {
  it('should send email with invalid email - fail', () => {
    cy.visit('/login').wait(3000)
    cy.get('[data-id="recovery"]').click()
    cy.get('[data-id="recovery-form"]').within(() => {
      cy.get('[name="email"]').type('invalid@email.com')
      cy.get('[type="submit"]').click().wait(1000)
    })
    cy.get(toastStyles.error).should('be.visible')
    cy.contains('Close').click()
    cy.get('[data-id="recovery-form"]').not('be.visible')
  })

  it('should send email with valid email - success', () => {
    cy.visit('/login').wait(3000)
    cy.get('[data-id="recovery"]').click()
    cy.get('[data-id="recovery-form"]').within(() => {
      cy.get('[name="email"]').type(Cypress.env('email'))
      cy.get('[type="submit"]').click().wait(1000)
    })
    cy.get(toastStyles.success).should('be.visible')
    cy.contains('Close').click()
    cy.get('[data-id="recovery-form"]').not('be.visible')
  })
})
