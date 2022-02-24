const { body, query } = require('express-validator');
const {
  STRING_LENGTH_LIMIT,
  DEFAULT_DATE_FORMAT
} = require('../../utils/constants/common.const');
const { TODO_STATUS } = require('../../utils/constants/todo.const');

exports.validateQueryTodo = () => {
  return [
    query('dueDate')
      .optional()
      .isBoolean()
      .withMessage('dueDate is invalid')
      .toBoolean()
  ];
};

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
      .withMessage('The maximum length of description is 255 characters'),
    body('dueDate')
      .optional()
      .isDate({ format: DEFAULT_DATE_FORMAT })
      .withMessage('dueDate is invalid')
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
