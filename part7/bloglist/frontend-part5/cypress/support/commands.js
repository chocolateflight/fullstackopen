/* eslint-disable linebreak-style */

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/v1/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3001/api/v1/blogs',
    method: 'POST',
    body: { title, author, url, likes: likes || 0 },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedInUser')).token
      }`,
    },
  });

  cy.visit('http://localhost:3000');
});
