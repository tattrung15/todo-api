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

  /**
   * Update todo
   * @param {object} data
   * @param {object} options
   * @param {object} trx
   * @return {Promise<Array<number, number>>}
   */
  async update(data, options, trx = null) {
    return this.model.update({ ...data }, { ...options, transaction: trx });
  }

  /**
   * Delete todo
   * @param {object} options
   * @param {object} trx
   * @return {Promise<number>} The number of destroyed rows
   */
  async delete(options, trx = null) {
    return this.model.destroy({ ...options, transaction: trx });
  }
}

const TodoReposiory = new _TodoReposiory(Todo);
module.exports = TodoReposiory;
