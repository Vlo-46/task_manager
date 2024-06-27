const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConfig');
const User = require('./user');

class Task extends Model {}

Task.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
    defaultValue: 'pending',
  },
}, { sequelize, modelName: 'task' });

Task.belongsTo(User);
User.hasMany(Task);

module.exports = Task;
