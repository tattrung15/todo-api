const HttpStatus = require('http-status');
const BaseController = require('../base/base.controller');
const TodoReposiory = require('../repositories/todo.repository');
const { AppError } = require('../utils/helpers/error.helper');

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
        dueDate: body.dueDate,
        userId
      });

      this.resSuccess(req, res)(result);
    } catch (e) {
      next(this.instanceError(e));
    }
  }

  async updateTodo(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { todoId } = req.params;
      const body = req.body;

      const todo = await TodoReposiory.get({
        where: {
          id: todoId,
          userId
        }
      });

      if (!todo) {
        throw new AppError('Not found todo', HttpStatus.NOT_FOUND);
      }

      const result = await TodoReposiory.update(
        {
          title: body.title,
          description: body.description,
          dueDate: body.dueDate
        },
        {
          where: {
            id: todoId,
            userId
          }
        }
      );

      this.resSuccess(req, res)(result);
    } catch (e) {
      next(this.instanceError(e));
    }
  }

  async changeTodoStatus(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { todoId } = req.params;
      const body = req.body;

      const todo = await TodoReposiory.get({
        where: {
          id: todoId,
          userId
        }
      });

      if (!todo) {
        throw new AppError('Not found todo', HttpStatus.NOT_FOUND);
      }

      const result = await TodoReposiory.update(
        {
          status: body.status
        },
        {
          where: {
            id: todoId,
            userId
          }
        }
      );

      this.resSuccess(req, res)(result);
    } catch (e) {
      next(this.instanceError(e));
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { todoId } = req.params;

      const todo = await TodoReposiory.get({
        where: {
          id: todoId,
          userId
        }
      });

      if (!todo) {
        throw new AppError('Not found todo', HttpStatus.NOT_FOUND);
      }

      const result = await TodoReposiory.delete({
        where: {
          id: todoId,
          userId
        }
      });

      this.resSuccess(req, res)(result);
    } catch (e) {
      next(this.instanceError(e));
    }
  }
}

const TodoController = new _TodoController();
module.exports = TodoController;
