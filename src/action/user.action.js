const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BaseClass = require('../base/base.class');
const UserReposiory = require('../repositories/user.repository');
const { sequelize } = require('../sequelize/models');
const { AppError } = require('../utils/helpers/error.helper');
const AppConfig = require('../app.config');

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

  async login(username, password) {
    const user = await UserReposiory.get({
      where: {
        username
      }
    });

    if (!user) {
      throw new AppError('Incorrect username or password');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new AppError('Incorrect username or password');
    }

    delete user.dataValues.password;

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      AppConfig.APP_JWT_SECRET,
      {
        expiresIn: '12h'
      }
    );

    return { accessToken, user };
  }

  async signUp(username, password) {
    const existUser = await UserReposiory.get({
      where: {
        username
      }
    });

    if (existUser) {
      throw new AppError('Username already exists');
    }

    const user = await UserReposiory.create({
      username,
      password
    });

    delete user.dataValues.password;

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      AppConfig.APP_JWT_SECRET,
      {
        expiresIn: '12h'
      }
    );

    return { accessToken, user };
  }
}

const UserAction = new _UserAction();
module.exports = UserAction;
