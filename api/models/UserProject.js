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

User.belongsToMany(Project, {
  through: {
   model: UserProject,
   unique: false
  },
  foreignKey: 'user_id',
  constraints: false
})
Project.belongsToMany(User, {
  through: {
    model: UserProject,
    unique: false
  },
  foreignKey: 'project_id',
  constraints: false
})
UserProject.belongsTo(Role, {as: 'role'})

// eslint-disable-next-line
UserProject.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = UserProject;
