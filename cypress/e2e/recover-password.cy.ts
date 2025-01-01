import { toastStyles } from '../constants'

describe('recover password', () => {
  it('should send email with invalid email - fail', () => {
    cy.intercept('POST', '/api/users/recover-password', {
      headers: { 'content-type': 'application/json' },
      body:{
        error: "Bad Request",
        message: "Sorry, account with this email does not exist...",
        statusCode: 400
      }
    }).as('recoverPassword')

    cy.visit('/login').wait(500)
    cy.get('[data-id="recovery"]').click().then(() => {
      cy.get('[data-id="modal"]').should('be.visible').within(() => {
        cy.contains('Close').should('be.visible')
  
        cy.get('[data-id="recovery-form"]').should('exist')
        cy.get('[data-id="recovery-form"]').should('be.visible').within(() => {
          cy.get('[name="email"]').type('invalid@email.com')
          cy.get('[type="submit"]').click()
        })
      })
    })
    cy.get(toastStyles.error).should('be.visible')
  })

  it('should send email with valid email - success', () => {
    cy.intercept('POST', '/api/users/recover-password', {
      headers: { 'content-type': 'application/json' },
      body: { success: true }
    }).as('recoverPassword')

    cy.visit('/login').wait(500)
    cy.get('[data-id="recovery"]').click().then(() => {
      cy.get('[data-id="modal"]').should('be.visible').within(() => {
        cy.get('[data-id="recovery-form"]').within(() => {
          cy.get('[name="email"]').type(Cypress.env('email'))
          cy.get('[type="submit"]').click().wait(1000)
        })
      }).then(() => {
        cy.get(toastStyles.success).should('be.visible')
      })
    })
  })
})
