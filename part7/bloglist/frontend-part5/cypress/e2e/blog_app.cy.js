describe('Blog App', () => {
  describe('successful login', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3001/api/v1/testing/reset');
      const user = {
        name: 'Sir Test',
        username: 'test',
        password: 'test',
      };

      cy.request('POST', 'http://localhost:3001/api/v1/users', user);
      cy.visit('http://localhost:3000');
    });

    describe('not logged in', () => {
      it('front page can be opened', () => {
        cy.contains('log in to application');
        cy.contains('Username');
        cy.contains('Password');
        cy.contains('Login');
      });

      it('user can login', () => {
        cy.get('#username').type('test');
        cy.get('#password').type('test');
        cy.get('#btn-login').click();
        cy.contains('Sir Test was successfully logged in');
      });
    });

    describe.skip('when logged in', () => {
      beforeEach(() => {
        cy.login({ username: 'test', password: 'test' });
      });

      it('a blog can be created', () => {
        cy.contains('Create new note').click();
        cy.get('#title').type('this is a test blog');
        cy.get('#author').type('this is a test author');
        cy.get('#url').type('this-is-a-test.com');
        cy.get('#btn-submit').click();
        cy.contains('successfully added');
        cy.contains('this is a test blog');
      });

      it('a blog can be liked', () => {
        const newBlog = {
          title: 'test blog',
          author: 'test author',
          url: 'test-url.com',
        };
        cy.createBlog(newBlog);
        cy.contains('view').click();
        cy.get('#btn-like').click();
        cy.contains('Likes: 1');
      });

      it('a blog can be deleted', () => {
        const newBlog = {
          title: 'test blog',
          author: 'test author',
          url: 'test-url.com',
        };
        cy.createBlog(newBlog);
        cy.contains('view').click();
        cy.get('#btn-remove').click();
        cy.contains('test blog').should('not.exist');
      });

      it('blogs are in correct order', () => {
        const newBlog1 = {
          title: 'test blog 1',
          author: 'test author',
          url: 'test-url.com',
          likes: 0,
        };
        const newBlog2 = {
          title: 'test blog 2',
          author: 'test author',
          url: 'test-url.com',
          likes: 1,
        };

        cy.createBlog(newBlog1);
        cy.createBlog(newBlog2);

        cy.get('.blog').eq(0).should('contain', 'test blog 2');
        cy.get('.blog').eq(1).should('contain', 'test blog 1');
      });
    });
  });

  describe.skip('failed login', () => {
    it.skip('login fails with wrong credentials', () => {
      cy.visit('http://localhost:3000');
      cy.get('#username').type('wrong');
      cy.get('#password').type('wrong');
      cy.get('#btn-login').click();
      cy.contains('Wrong Credentials');
    });
  });
});
