const express = require('express');
const TodoController = require('./controllers/todo.controller');
const UserController = require('./controllers/user.controller');
const { authenticateJwt } = require('./middlewares/auth.middleware');
const UserValidator = require('./middlewares/validators/user.validator');
const TodoValidator = require('./middlewares/validators/todo.validator');
const validate = require('./middlewares/validators/validator');

const route = express.Router();

route.get('/', (req, res) => res.json('This is todo app'));

route.post(
  '/login',
  validate(UserValidator.validateLogin()),
  UserController.login
);

route.post(
  '/signup',
  validate(UserValidator.validateSignUp()),
  UserController.signUp
);

route.get('/users', authenticateJwt, UserController.getListUsers);

route.get('/todos', authenticateJwt, TodoController.getListTodos);

route.post(
  '/todos',
  authenticateJwt,
  validate(TodoValidator.validateCreate()),
  TodoController.createNewTodo
);

module.exports = route;
