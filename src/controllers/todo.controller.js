const BaseController = require('../base/base.controller');
const TodoReposiory = require('../repositories/todo.repository');

class _TodoController extends BaseController {
  async getListTodos(req, res, next) {
    try {
      const { id: userId } = req.user;
      const data = req.query;
      data.equal = {
        ...data.equal,
        userId
      };

      const result = await TodoReposiory.find(data);

      this.resSuccess(req, res)(result);
    } catch (e) {
      next(this.instanceError(e));
    }
  }

  async createNewTodo(req, res, next) {
    try {
      const { id: userId } = req.user;
      const body = req.body;

      const result = await TodoReposiory.create({
        title: body.title,
        description: body.description,
        userId
      });

      this.resSuccess(req, res)(result);
    } catch (e) {
      next(this.instanceError(e));
    }
  }
}

const TodoController = new _TodoController();
module.exports = TodoController;
