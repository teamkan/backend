const Sequelize = require('sequelize');
const Role = require('./Role')
const User = require('./User')
const Project = require('./Project')
const sequelize = require('../../config/database');

const hooks = {
 };

const tableName = 'user_projects';

const UserProject = sequelize.define('UserProject', {
}, { hooks, tableName });

UserProject.belongsTo(Role, {as: 'role'})
UserProject.belongsTo(Project, {as: 'project'})
UserProject.belongsTo(User, {as: 'user'})

// eslint-disable-next-line
UserProject.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = UserProject;
