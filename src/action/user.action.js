const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BaseClass = require('../base/base.class');
const UserReposiory = require('../repositories/user.repository');
const { sequelize } = require('../sequelize/models');
const { AppError } = require('../utils/helpers/error.helper');
const AppConfig = require('../app.config');
const HttpStatus = require('http-status');

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

  async validateToken(token) {
    try {
      const verified = jwt.verify(token, AppConfig.APP_JWT_SECRET);

      if (!verified) {
        throw new AppError('token is invalid');
      }

      const user = await UserReposiory.get({
        where: {
          username: verified.username
        }
      });

      if (!user) {
        throw new AppError('token is invalid');
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
    } catch (e) {
      throw new AppError(e.message, HttpStatus.BAD_REQUEST);
    }
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
