const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {}

    static encryptPassword(password) {
      return bcrypt.hashSync(password, 10);
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      hooks: {
        beforeCreate: (user) => {
          user.password = User.encryptPassword(user.password);
        },
        beforeUpdate: (user) => {
          if (user.changed('password')) {
            const currentEncPassword = user._previousDataValues.password;
            const newPassword = user.dataValues.password;
            if (bcrypt.compareSync(newPassword, currentEncPassword)) {
              user.password = currentEncPassword;
            } else {
              user.password = User.encryptPassword(newPassword);
            }
          }
        }
      }
    }
  );

  return User;
};
