import { toastStyles } from '../constants'

describe('login', () => {
  it('should login by credentials with invalid credentials - fail', () => {
    cy.intercept('POST', '/api/auth/callback/credentials', {
      body: {"url":"http://localhost:3000/api/auth/error?error=Invalid%20credentials..."}
    }).as('login')

    cy.visit('/login')
    cy.get('[name="email"]').type('failed@test.net')
    cy.get('[name="password"]').type('failed test')
    cy.get('[type="submit"]').click()
    cy.get(toastStyles.error).should('be.visible')
  })

  it.skip('should login by credentials - success', () => {
    // cy.intercept('POST', '/api/auth/callback/credentials', {
    //   body: {"url":"http://localhost:3000/api/auth/signin/credentials"}
    // }).as('login')

    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: {
        user: {
          name: 'Logged In User',
          email: 'user@example.com',
          // image: 'https://via.placeholder.com/150',
          image: '',
        },
        expires: '9999-12-31T23:59:59.999Z',
      },
    }).as('getSessionLoggedIn')

    cy.visit('/login')
    cy.get('[name="email"]').type(Cypress.env('email'))
    cy.get('[name="password"]').type(Cypress.env('password'))
    cy.get('[type="submit"]').click()
    cy.url().should('eq', `${Cypress.env('appUrl')}/home`)
    cy.getCookie('next-auth.session-token').should('be.exist')

    // cy.intercept('GET', '/api/auth/session', {
    //   statusCode: 200,
    //   body: {},
    // }).as('getSessionLoggedOut')

    // cy.get('#logout').click() // logout
    // cy.contains('Improve your English!').should('be.visible')
    // cy.getCookie('next-auth.session-token').should('not.exist')
  })
})