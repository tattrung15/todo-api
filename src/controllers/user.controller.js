const BaseController = require('../base/base.controller');
const UserReposiory = require('../repositories/user.repository');

class _UserController extends BaseController {
  async getListUser(req, res, next) {
    try {
      const result = await UserReposiory.getList({
        attributes: { exclude: ['password'] }
      });
      this.resSuccess(req, res, result);
    } catch (e) {
      // TODO
    }
  }
}

const UserController = new _UserController();
module.exports = UserController;
