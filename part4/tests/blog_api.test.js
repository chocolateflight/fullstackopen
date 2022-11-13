const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogs);
});

/* -------------------------------------------------------------------------- */

// Tests GET

test('blogs are returned as json', async () => {
  await api
    .get('/api/v1/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('all blogs are returned', async () => {
  const response = await api.get('/api/v1/blogs');
  expect(response.body).toHaveLength(helper.blogs.length);
});

// test('a specific blog is within the returned blogs', async () => {
//   const response = await api.get('/api/v1/blogs');
//   const blogs = response.body.map((r) => r.title);
//   expect(blogs).toContain('First class tests');
// });

test('view specific blog', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/v1/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const processesBlogToView = JSON.parse(JSON.stringify(blogToView));
  expect(resultBlog.body).toEqual(processesBlogToView);
});

/* -------------------------------------------------------------------------- */

// Tests POST

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Marc',
    url: 'http://www.google.com',
    likes: 200,
  };

  await api
    .post('/api/v1/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1);

  const blogs = blogsAtEnd.map((b) => b.title);
  expect(blogs).toContain('Test Blog');
});

test.only('a blog without title and URL cannot be added to the database', async () => {
  const newBlog = {
    author: 'Marc',
    likes: 200,
  };

  await api.post('/api/v1/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogs.length);
});

test('a blog without likes is assigned 0 likes', async () => {
  const newBlog = {
    title: 'A new Test Blog',
    author: 'Marc',
    url: 'http://www.google.com',
  };

  await api
    .post('/api/v1/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const addedBlog = blogsAtEnd.filter((b) => b.title === newBlog.title)
  expect(addedBlog[0].likes).toBe(0)
});

/* -------------------------------------------------------------------------- */

// Test Delete

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/v1/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);

  const blogs = blogsAtEnd.map((b) => b.title);
  expect(blogs).not.toContain(blogToDelete.title);
}, 100000);

/* -------------------------------------------------------------------------- */

// Test Various
test('id is defined', async () => {
  const response = await api.get('/api/v1/blogs');
  expect(response.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
