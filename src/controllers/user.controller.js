const BaseController = require('../base/base.controller');
const UserReposiory = require('../repositories/user.repository');

class _UserController extends BaseController {
  async login(req, res, next) {
    try {
      // TODO
      this.resSuccess(req, res)(req.body);
    } catch (e) {
      console.log(e);
      next(this.instanceError(e));
    }
  }

  async getListUser(req, res, next) {
    try {
      const query = req.query;

      const result = await UserReposiory.findAll(query);

      this.resSuccess(req, res)(result);
    } catch (e) {
      console.log(e);
      next(this.instanceError(e));
    }
  }
}

const UserController = new _UserController();
module.exports = UserController;
