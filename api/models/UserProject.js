const Sequelize = require('sequelize');
const User = require('./User')
const Project = require('./Project')
const sequelize = require('../../config/database');

const hooks = {
 };

const tableName = 'user_projects';

const UserProject = sequelize.define('UserProject', {
  roleId : {
    type: Sequelize.ENUM,
    values: ['project_owner', 'scrum_master', 'developer', 'standard']
  }
}, { hooks, tableName });

UserProject.belongsTo(Project, {as: 'project'})
UserProject.belongsTo(User, {as: 'user'})

// eslint-disable-next-line
UserProject.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = UserProject;
