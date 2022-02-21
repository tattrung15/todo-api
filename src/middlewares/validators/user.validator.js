const { body } = require('express-validator');

exports.validateLogin = () => {
  return [
    body('username').exists().withMessage('username is required'),
    body('password').exists().withMessage('password is required')
  ];
};
