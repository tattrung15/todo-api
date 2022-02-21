const { INTERNAL_SERVER_ERROR } = require('http-status');
const { DatabaseError } = require('sequelize');
const LogService = require('../../services/log.service');

class AppError extends Error {
  constructor(message, status = 500) {
    super();
    this.status = status;
    this.message = message;
  }
}

function handleAppError(req, res) {
  return (error) => {
    const { status, message } = error;

    LogService.logAppErrorRequest(req)(status, message);

    res.status(status).json({
      status,
      message,
      result: null
    });
  };
}

function handleError(req, res) {
  return (error) => {
    const errorMsg = constructErrorMsg(error);

    LogService.logErrorRequest(req)(errorMsg);

    res.status(INTERNAL_SERVER_ERROR).json({
      status: INTERNAL_SERVER_ERROR,
      message: 'Server Error',
      result: null
    });
  };
}

/**
 * Construct and return error message from an error.
 *
 * @param {any} error
 * @returns {string} The constructed error message.
 */
function constructErrorMsg(error) {
  let errorMsg = '';
  if (typeof error === 'string') {
    errorMsg = error;
  } else if (typeof error === 'object') {
    let errorStr = error.toString();
    // Prevent unhelpful error log
    if (!errorStr || errorStr === '[object Object]') {
      errorStr = JSON.stringify(error);
    }
    // Check if error stack trace exists
    if (error.stack) {
      errorStr += `\n  Stack Trace: ${error.stack}`;
    }
    // Check if `sequelize` error
    if (error instanceof DatabaseError) {
      errorStr += `\n  SQL: ${error.sql}`;
    }
    errorMsg = errorStr;
  } else {
    errorMsg = 'Unknown server error';
  }

  return errorMsg;
}

module.exports = {
  AppError,
  handleAppError,
  handleError
};
