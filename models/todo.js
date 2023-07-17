'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, { foreignKey: 'idUser' });
    }
  }
  Todo.init({
    idUser: DataTypes.INTEGER,
    taskName: DataTypes.STRING,
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};