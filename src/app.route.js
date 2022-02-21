const express = require('express');
const UserController = require('./controllers/user.controller');
const { authenticateJwt } = require('./middlewares/auth.middleware');
const UserValidator = require('./middlewares/validators/user.validator');
const validate = require('./middlewares/validators/validator');

const route = express.Router();

route.get('/', (req, res) => res.json('This is todo app'));

route.post(
  '/login',
  validate(UserValidator.validateLogin()),
  UserController.login
);

route.get('/users', UserController.getListUsers);

module.exports = route;
