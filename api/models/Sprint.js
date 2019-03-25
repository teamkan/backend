const Sequelize = require('sequelize');
const Project = require('./Project');
const sequelize = require('../../config/database');

const hooks = {
};

const tableName = 'sprints';

const Sprint = sequelize.define('Sprint', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    startdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    enddate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    velocity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, { hooks, tableName });

Sprint.belongsTo(Project, { as: 'project', foreignKey: { allowNull: false } });

// eslint-disable-next-line
Sprint.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Sprint;