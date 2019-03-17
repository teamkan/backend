const Sequelize = require('sequelize');
const Project = require('./Project')
const sequelize = require('../../config/database');

const hooks = {
 };

const tableName = 'story';

const Story = sequelize.define('Story', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  tests: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  businessValue: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: false
  },
  priority : {
    type: Sequelize.ENUM,
    values: ['must_have', 'should_have', 'could_have', 'wont_have']
  }
}, { hooks, tableName });

Story.belongsTo(Project, {as: 'project', foreignKey: { allowNull: false }});

// eslint-disable-next-line
Story.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Story;
