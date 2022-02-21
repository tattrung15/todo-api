const BaseRepository = require('../base/base.repository');
const { Todo } = require('../sequelize/models');

class _TodoReposiory extends BaseRepository {
  constructor(model) {
    super(model);
  }

  /**
   * Find todos
   * @param {{like: object, equal: object, sort: object}} data
   * @return {Promise<`Todo`[]>}
   */
  async find(data) {
    const options = {
      ...this.getBasicQueryOptions(data)
    };

    const result = await this.getList(options);
    return result;
  }
}

const TodoReposiory = new _TodoReposiory(Todo);
module.exports = TodoReposiory;
