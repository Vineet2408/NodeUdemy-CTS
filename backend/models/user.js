const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name:Sequelize.STRING,
    lastName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    age:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    profilePic:{
        type:Sequelize.STRING,
        allowNull:false
    },
    contact:{
        type:Sequelize.STRING,
        allowNull:false
    },
    role:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = User;
