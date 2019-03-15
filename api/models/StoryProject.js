const Sequelize = require('sequelize');
const Story = require('./Story')
const Project = require('./Project')
const sequelize = require('../../config/database');

const hooks = {
 };

const tableName = 'story_project';

const StoryProject = sequelize.define('StoryProject', {
}, { hooks, tableName });

StoryProject.belongsTo(Project, {as: 'project'})
StoryProject.belongsTo(Story, {as: 'story'})

// eslint-disable-next-line
StoryProject.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = StoryProject;
