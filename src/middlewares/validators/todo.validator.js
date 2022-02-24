const { body } = require('express-validator');
const { STRING_LENGTH_LIMIT } = require('../../utils/constants/common.const');
const { TODO_STATUS } = require('../../utils/constants/todo.const');

exports.validateCreate = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('title is required')
      .isLength({ max: STRING_LENGTH_LIMIT })
      .withMessage('The maximum length of title is 255 characters'),
    body('description')
      .optional()
      .isLength({ max: STRING_LENGTH_LIMIT })
      .withMessage('The maximum length of description is 255 characters')
  ];
};

exports.validateTodoStatus = () => {
  return [
    body('status')
      .isInt()
      .withMessage('status is invalid')
      .custom((value) => Object.values(TODO_STATUS).includes(value))
      .withMessage('status is invalid')
  ];
};
