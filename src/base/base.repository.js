const BaseClass = require('./base.class');

class BaseRepository extends BaseClass {
  constructor(model) {
    super();
    this.model = model;
  }

  async getList(options = {}) {
    return this.model.findAll(options);
  }
}

module.exports = BaseRepository;
