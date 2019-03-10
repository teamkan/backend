const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {
};

const tableName = 'roles';

const Role = sequelize.define('Role', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
}, { hooks, tableName });

// eslint-disable-next-line
Role.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Role;
