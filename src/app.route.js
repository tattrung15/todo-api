const express = require('express');
const UserController = require('./controllers/user.controller');
const AppError = require('./utils/error');

const route = express.Router();

route.get('/', (req, res) => res.json('This is todo app'));

route.get('/users', UserController.getListUser);

module.exports = route;
