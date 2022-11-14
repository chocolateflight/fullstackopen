const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  let user = await User.find({});
  user = user[0];

  user.blogs = [];
  await user.save();

  const blogs = helper.blogs.map(
    (blog) =>
      new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: user,
        likes: blog.likes,
      })
  );

  const promiseArray = blogs.map(async (blog) => {
    await blog.save();
    user.blogs = user.blogs.concat(blog.id);
  });
  
  await Promise.all(promiseArray);
  await user.save();
});

/* -------------------------------------------------------------------------- */

// Tests GET

describe('Accessing all already saved blogs', () => {
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

  test.skip('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/v1/blogs');
    const blogs = response.body.map((r) => r.title);
    expect(blogs).toContain('First class tests');
  });

  test('the number of referenced blogs of users matches the total number of blogs', async () => {
    const responseBlogs = await api.get('/api/v1/blogs');
    const responseUsers = await api.get('/api/v1/users');
    const blogsInUsers = responseUsers.body.map((user) => user.blogs).flat();

    expect(blogsInUsers).toHaveLength(responseBlogs.body.length);
  });
});

describe('Accessing an already saved specific blog', () => {
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

  test('fails with 404 if specific blog does not exist', async () => {
    const noneExisitingId = await helper.nonExisitingId();
    await api.get(`/api/v1/blogs/${noneExisitingId}`).expect(404);
  });

  test('fails with 400 if ID is invalid', async () => {
    const invalidId = '1b2b';
    await api.get(`/api/v1/blogs/${invalidId}`).expect(400);
  });
});

/* -------------------------------------------------------------------------- */

// Tests POST

describe('Adding new Blogs', () => {
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

  test('a blog without title and URL cannot be added to the database', async () => {
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
    const addedBlog = blogsAtEnd.filter((b) => b.title === newBlog.title);
    expect(addedBlog[0].likes).toBe(0);
  });
});

/* -------------------------------------------------------------------------- */

// Test Update

describe('Updating blogs', () => {
  test('a blogpost can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: 'This blog was updated',
      author: 'Marc',
      url: 'ignorethis.url',
      likes: 500,
    };

    await api
      .put(`/api/v1/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedDBBlog = blogsAtEnd.filter((b) => b.title === updatedBlog.title);
    expect(blogsAtEnd.length).toBe(blogsAtStart.length);
    expect(updatedDBBlog[0].id).toBe(blogToUpdate.id);
  });
});

/* -------------------------------------------------------------------------- */

// Test Delete

describe('Deleting blogs', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/v1/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);

    const blogs = blogsAtEnd.map((b) => b.title);
    expect(blogs).not.toContain(blogToDelete.title);
  }, 100000);

  test('fails with 400 if ID is invalid', async () => {
    const invalidId = '1b2b';
    await api.get(`/api/v1/blogs/${invalidId}`).expect(400);
  });
});

/* -------------------------------------------------------------------------- */

// Test Various

describe('Misc. Tests', () => {
  test('id is defined', async () => {
    const response = await api.get('/api/v1/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
