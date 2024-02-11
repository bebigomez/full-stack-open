describe('Blog app', function () {
  beforeEach(function () {

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    cy.createUser({
      name: 'Tester2',
      username: 'tester2',
      password: 'salainen2'
    })

    cy.createUser({
      name: 'Bebi Tester',
      username: 'bebi_tester',
      password: 'salainen',
    })

    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('bebi_tester')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Bebi Tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('bebi_tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'bebi_tester', password: 'salainen' })
      cy.createBlog({
        title: 'blog for testing like and deletion',
        author: 'bebi tester',
        url: 'testing.com',
        likes: 100,
      })

      cy.visit('')
    })

    it('a new blog can be created', function () {
      cy.get('#new-blog-button').click()

      cy.get('#title').type('This is a new blog for testing')
      cy.get('#author').type('bebi tester')
      cy.get('#url').type('testing.com')

      cy.get('#save-button').click()

      cy.contains('This is a new blog for testing bebi tester')
    })

    it('user can like a blog', function () {
      
      cy.contains('blog for testing like and deletion')
        .contains('show')
        .click()

      cy.contains('Likes: 100').contains('like').click()

      cy.contains('Likes: 101')
    })

    it('user can delete his own blog', function () {
      cy.contains('blog for testing like and deletion')
        .contains('show')
        .click()

      cy.get('#delete-button').click()
      
      cy.get('html').should('not.contain', 'blog for testing like and deletion')
    })
  })

  describe('When other user login', function () {
    beforeEach(function () {
      cy.login({ username: 'bebi_tester', password: 'salainen' })

      cy.createBlog({
        title: 'least liked blog',
        author: 'bebi tester',
        url: 'testing.com',
        likes: 0,
      })

      cy.visit('')

      cy.get('#logout-button').click()

      cy.login({ username: 'tester2', password: 'salainen2' })

      cy.createBlog({
        title: 'second most likes',
        author: 'tester 2',
        url: 'testing.com',
        likes: 0,
      })

      cy.createBlog({
        title: 'the title with the most likes',
        author: 'tester 2',
        url: 'testing.com',
        likes: 0,
      })

      cy.visit('')
    })

    it('only original blog creator can see delete button', function () {
      cy.contains('least liked blog')
      .contains('show').click()

      cy.get('#delete-button').should('not.exist')
    })

    it('blogs are ordered by likes. most liked blog appears first.', function () {
      cy.contains('second most likes tester 2')
        .contains('show')
        .click()
      cy.contains('Likes: 0').contains('like').click()
      
      cy.contains('second most likes tester 2')
        .contains('hide')
        .click()

      cy.contains('the title with the most likes tester 2')
        .contains('show')
        .click()
      cy.contains('Likes: 0').contains('like').click()
      cy.contains('Likes: 1').contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'the title with the most likes tester 2')
      cy.get('.blog').eq(1).should('contain', 'second most likes tester 2')
      cy.get('.blog').eq(2).should('contain', 'least liked blog bebi tester')
    })
  })
})
