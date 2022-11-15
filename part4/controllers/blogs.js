const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');
require('express-async-errors');

/* -------------------------------------------------------------------------- */

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }
  response.json(blog);
});

/* -------------------------------------------------------------------------- */

// POST

blogsRouter.post(
  '/',
  middleware.getTokenFrom,
  middleware.tokenValidation,
  async (request, response) => {
    const body = request.body;
    const user = request.user;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user,
      likes: body.likes,
    });

    if (!blog.likes) {
      blog.likes = 0;
    }

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.status(201).json(savedBlog);
  }
);

/* -------------------------------------------------------------------------- */

// DELETE

blogsRouter.delete(
  '/:id',
  middleware.getTokenFrom,
  middleware.tokenValidation,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).end();
    }

    if (blog.user._id.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      const index = user.blogs.indexOf(request.params.id);
      user.blogs.splice(index, 1);
      await user.save();
      response.status(204).end();
    } else {
      return response.status(401).json({ error: 'unauthorized' });
    }
  }
);

/* -------------------------------------------------------------------------- */

// PUT
blogsRouter.put(
  '/:id',
  middleware.getTokenFrom,
  middleware.tokenValidation,
  async (request, response) => {
    const user = request.user;
    const newBlog = request.body;
    const oldBlog = await Blog.findById(request.params.id);

    if (!oldBlog) {
      return response.status(404).end();
    }

    if (!newBlog.likes) {
      newBlog.likes = 0;
    }

    if (oldBlog.user._id.toString() === user._id.toString()) {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
        new: true,
        runValidators: true,
        context: 'query',
      });

      response.json(updatedBlog.toJSON());
    } else {
      return response.status(401).json({ error: 'unauthorized' });
    }
  }
);

/* -------------------------------------------------------------------------- */

module.exports = blogsRouter;
