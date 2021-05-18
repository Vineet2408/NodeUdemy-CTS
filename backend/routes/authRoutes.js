
const express = require('express');
const authController = require('../controller/authController');

const User = require('../models/user');

const authRouter = express.Router();


const {body} = require('express-validator/check');

authRouter.post('/addUser',[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value,{req})=>{
        console.log(value);
        return User.findOne({where:{email:value}}).then(userDoc=>{
            if(userDoc)
            {
                return Promise.reject('Email address already exists!');
            }
        })
    })
],
authController.postAddUser);


authRouter.post('/login',authController.login);
authRouter.post('/addUser',authController.postAddUser);


module.exports = authRouter;
