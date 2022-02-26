const { body } = require('express-validator');
const { STRING_LENGTH_LIMIT } = require('../../utils/constants/common.const');

exports.validateLogin = () => {
  return [
    body('username').exists().withMessage('username is required'),
    body('password').exists().withMessage('password is required')
  ];
};

exports.validateToken = () => {
  return [body('jwt').isString().withMessage('jwt is invalid')];
};

exports.validateSignUp = () => {
  return [
    body('username')
      .notEmpty()
      .withMessage('username is required')
      .isLength({ max: STRING_LENGTH_LIMIT })
      .withMessage('The maximum length of username is 255 characters'),
    body('password').notEmpty().withMessage('password is required')
  ];
};
