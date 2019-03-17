const Sequelize = require('sequelize');
const User = require('./User');
const Project = require('./Project');
const sequelize = require('../../config/database');

const hooks = {
    
};

const tableName = 'sprints';

const Sprint = sequelize.define('Sprint', {
    sprintname: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    startdate: {
        type: Sequelize.DATETIME,
        allowNull: false,
    },
    enddate: {
        type: Sequelize.DATETIME,
        allowNull: false,
    },
    speed: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, { hooks, tableName });

Sprint.belongsTo(User, { as: 'user' })
Sprint.belongsTo(Project, { as: 'project' })
// eslint-disable-next-line
Sprint.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    return values;
};

module.exports = Sprint;
