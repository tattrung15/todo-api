const autoBind = require('auto-bind');

class BaseClass {
  constructor() {
    autoBind(this);
  }
}

module.exports = BaseClass;
