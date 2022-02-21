const HttpStatus = require('http-status');
const { validationResult } = require('express-validator');
const {
  handleAppError,
  AppError
} = require('../../utils/helpers/error.helper');

/**
 * Middleware function to handle express-validator validating result
 *
 * @param {any[]} validations
 * @return {Function} The middleware that will contain the result of the validation
 */
const validate = (validations) => async (req, res, next) => {
  for (let validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return handleAppError(
    req,
    res
  )(new AppError(errors.array()[0].msg, HttpStatus.UNPROCESSABLE_ENTITY));
};

module.exports = validate;
