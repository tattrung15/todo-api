const { body } = require('express-validator');
const { STRING_LENGTH_LIMIT } = require('../../utils/constants/common.const');

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
