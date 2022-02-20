const BaseRepository = require('../base/base.repository');
const { User } = require('../sequelize/models');

class _UserReposiory extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

const UserReposiory = new _UserReposiory(User);
module.exports = UserReposiory;
