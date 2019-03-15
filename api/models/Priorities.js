const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const hooks = {
 };

const tableName = 'priorities';

const Priorities = sequelize.define('Priorities', {
  naziv: {
    type: Sequelize.STRING,
    unique: true
  },
}, { hooks, tableName });




// eslint-disable-next-line
Priorities.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Priorities;
