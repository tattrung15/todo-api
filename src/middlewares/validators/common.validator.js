const { param } = require('express-validator');

exports.validateId = (idParamName = 'id') => {
  return [
    param(idParamName).isInt().withMessage(`${idParamName} is invalid`).toInt()
  ];
};
