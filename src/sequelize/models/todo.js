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
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
