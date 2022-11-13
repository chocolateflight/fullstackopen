const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

/* -------------------------------------------------------------------------- */

// GET

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
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
  const body = request.body;
  let user = await User.find({});
  user = user[0];

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

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
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
