const BaseClass = require('../base/base.class');
const { sequelize } = require('../sequelize/models');

class _UserAction extends BaseClass {
  /**
   * Demo action with transaction
   */
  async updateUser(data) {
    const trx = await sequelize.transaction();
    try {
      // Many query
      // const result = ...
      await trx.commit();
      // return result;
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }
}

const UserAction = new _UserAction();
module.exports = UserAction;
