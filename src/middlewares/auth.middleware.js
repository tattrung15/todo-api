const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');
const AppConfig = require('../app.config');
const { handleAppError, AppError } = require('../utils/helpers/error.helper');

/**
 * Middleware for request that need authentication.
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(/\s/)[1];

    jwt.verify(token, AppConfig.APP_JWT_SECRET, (err, user) => {
      if (err) {
        return handleUnauthorized(req, res);
      }

      req.user = user;
      return next();
    });
  } else {
    return handleUnauthorized(req, res);
  }
};

const handleUnauthorized = (req, res) => {
  return handleAppError(
    req,
    res
  )(new AppError('Unauthorized request', HttpStatus.UNAUTHORIZED));
};

module.exports = { authenticateJwt };
