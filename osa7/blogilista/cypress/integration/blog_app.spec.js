
describe('Blog app ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress Tester',
      username: 'testaaja',
      password: 'salakala'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  describe('when not logged in', function () {
    it('user can login', function () {
      cy.contains('log in to application')
        .click()
      cy.get('#username')
        .type('testaaja')
      cy.get('#password')
        .type('salakala')
      cy.contains('login')
        .click()
      cy.contains('Cypress Tester logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username')
        .type('testaaja')
      cy.get('#password')
        .type('salakala')
      cy.contains('login')
        .click()
      cy.contains('Cypress Tester logged in')
    })

    it('user can logout', function () {
      cy.get('#nav_logout')
        .click()
      cy.contains('log in to application')
    })

    it('user can add blog', function () {
      cy.get('#create_new')
        .click()
      cy.get('#title')
        .type('A blog added by cypress')
      cy.get('#author')
        .type('Cypress Tester')
      cy.get('#url')
        .type('https://docs.cypress.io/guides/references/best-practices.html')
      cy.get('#create')
        .click()
      cy.contains('A blog added by cypress Cypress Tester')
    })
  })

  describe('when theres initially a blog created', function () {
    beforeEach(function () {
      cy.get('#username')
        .type('testaaja')
      cy.get('#password')
        .type('salakala')
      cy.contains('login')
        .click()
      cy.contains('Cypress Tester logged in')
      cy.get('#create_new')
        .click()
      cy.get('#title')
        .type('A blog added by cypress')
      cy.get('#author')
        .type('Cypress Tester')
      cy.get('#url')
        .type('https://docs.cypress.io/guides/references/best-practices.html')
      cy.get('#create')
        .click()
      cy.contains('A blog added by cypress Cypress Tester')
    })

    it('user can comment on blog', function () {
      cy.contains('A blog added by cypress Cypress Tester')
        .click()
      cy.get('#comment')
        .type('A comment added by cypress')
      cy.contains('add comment')
        .click()
      cy.contains('A comment added by cypress')
    })

    it('user can like blog', function () {
      cy.contains('A blog added by cypress Cypress Tester')
        .click()
      cy.contains('0 likes')
      cy.get('#like')
        .click()
      cy.contains('1 likes')
    })

  })
})
