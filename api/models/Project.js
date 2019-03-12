const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User')

const hooks = {
 };

const tableName = 'projects';

const Project = sequelize.define('Project', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
}, { hooks, tableName });




// eslint-disable-next-line
Project.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Project;
