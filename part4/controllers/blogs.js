const blogsRouter = require('express').Router();
const blog = require('../models/blog');
const Blog = require('../models/blog');
const { blogs } = require('../tests/test_helper');

/* -------------------------------------------------------------------------- */

// GET

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

/* -------------------------------------------------------------------------- */

// POST

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  if (!blog.likes) {
    blog.likes = 0;
  }

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

/* -------------------------------------------------------------------------- */

// DELETE

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

/* -------------------------------------------------------------------------- */

// PUT
blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body;

  if (!blog.likes) {
    blog.likes = 0;
  }

  console.log(blog);

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    response.json(updatedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

/* -------------------------------------------------------------------------- */

module.exports = blogsRouter;
