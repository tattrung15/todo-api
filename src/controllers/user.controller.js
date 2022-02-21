const UserAction = require('../action/user.action');
const BaseController = require('../base/base.controller');
const UserReposiory = require('../repositories/user.repository');

class _UserController extends BaseController {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const result = await UserAction.login(username, password);

      this.resSuccess(req, res)(result);
    } catch (e) {
      next(this.instanceError(e));
    }
  }

  async signUp(req, res, next) {
    try {
      const { username, password } = req.body;

      const result = await UserAction.signUp(username, password);

      this.resSuccess(req, res)(result);
    } catch (e) {
      next(this.instanceError(e));
    }
  }

  async getListUsers(req, res, next) {
    try {
      const data = req.query;

      const result = await UserReposiory.findAll(data);

      this.resSuccess(req, res)(result);
    } catch (e) {
      next(this.instanceError(e));
    }
  }
}

const UserController = new _UserController();
module.exports = UserController;
