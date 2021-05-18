const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Product = require('../models/product');
const User = require('../models/user');

const Cart = sequelize.define('cart',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    totalAmount:{
        type:Sequelize.DOUBLE,
        allowNull:false,
    },
    productId:{
        allowNull:false
    },
    userId:{
        allowNull:false
    }
});