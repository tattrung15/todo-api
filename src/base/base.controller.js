const HttpStatus = require('http-status');
const BaseClass = require('./base.class');
const { InstanceError } = require('./base.model');

class BaseController extends BaseClass {
  constructor() {
    super();
    this.defaultSuccessMsg = 'Request success';
  }

  resSuccess(req, res) {
    const defaultMessage = this.defaultSuccessMsg;

    return (data, message = defaultMessage, statusCode = HttpStatus.OK) => {
      return res.status(statusCode).json({
        status: statusCode,
        message,
        result: {
          data
        }
      });
    };
  }

  resPaginate(req, res) {
    const defaultMessage = this.defaultSuccessMsg;

    return (
      data,
      pagination,
      message = defaultMessage,
      statusCode = HttpStatus.OK
    ) => {
      return res.status(statusCode).json({
        status: statusCode,
        message,
        result: {
          data,
          pagination
        }
      });
    };
  }

  instanceError(e) {
    return new InstanceError(e);
  }
}

module.exports = BaseController;
