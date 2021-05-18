const Sequelize = require('sequelize');

const sequelize = new Sequelize('assignmentnodereact','root','root',
{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;
