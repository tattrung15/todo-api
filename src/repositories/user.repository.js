const BaseRepository = require('../base/base.repository');
const { User } = require('../sequelize/models');

class _UserReposiory extends BaseRepository {
  constructor(model) {
    super(model);
  }

  /**
   * Get all users
   * @param {{like: object, equal: object, sort: object}} data
   * @return {Promise<`User`[]>}
   */
  async findAll(data) {
    const options = {
      ...this.getBasicQueryOptions(data),
      attributes: { exclude: ['password'] }
    };

    const result = await this.model.findAll(options);
    return result;
  }
}

const UserReposiory = new _UserReposiory(User);
module.exports = UserReposiory;
