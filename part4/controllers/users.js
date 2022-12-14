const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
require('express-async-errors');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 });
  response.json(users);
});

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  if (username.length <= 3 && password.length <= 3) {
    return response.status(400).json({
      error: 'username and password must have at least 3 characters',
    });
  } else if (password.length <= 3) {
    return response.status(400).json({
      error: 'password must have at least 3 characters',
    });
  } else if (username.length <= 3) {
    return response.status(400).json({
      error: 'username must have at least 3 characters',
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
