const Sequelize = require('sequelize');
const Priorities = require('./Priorities')
const sequelize = require('../../config/database');

const hooks = {
 };

const tableName = 'story';

const Story = sequelize.define('Story', {
  naziv: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  besedilo: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  testi: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  poslovna_vrednost: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: false
  },
}, { hooks, tableName });

Story.belongsTo(Priorities, {as: 'priorities', foreignKey: { allowNull: false }})

// eslint-disable-next-line
Story.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Story;
