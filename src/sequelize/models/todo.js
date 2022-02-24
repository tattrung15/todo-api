const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Todo extends Model {
    static associate(models) {}
  }

  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Todo',
      tableName: 'todos',
      underscored: true,
      hooks: {}
    }
  );

  return Todo;
};
