const HttpStatus = require('http-status');
const BaseClass = require('./base.class');

class BaseController extends BaseClass {
  constructor() {
    super();
  }

  resSuccess(req, res, data, statusCode = HttpStatus.OK) {
    return res.status(statusCode).json({
      status: statusCode,
      message: 'Success',
      data
    });
  }

  resPaginate(req, res, data, pagination, statusCode = HttpStatus.OK) {
    return res.status(statusCode).json({
      status: statusCode,
      message: 'Success',
      data,
      pagination
    });
  }
}

module.exports = BaseController;
