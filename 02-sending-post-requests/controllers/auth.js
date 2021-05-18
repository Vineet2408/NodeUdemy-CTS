const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult }= require('express-validator/check');
const jwt = require('jsonwebtoken');
exports.singup=(req,res,next)=>{    

    const errors = validtoerResult(req);
    if(!errors.isEmpty())
    {
        const error = new Error('validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    bcrypt.hash(password,12).then(
        hashPwd=>{
            const user = new User({
                email:email,
                password:hashPwd,
                name:name
            });
            return user.save();
        })
    .then(result=>{
        res.statusCode(201).json({message:'User created',userId:result._id});
    })
    .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode=500;
        }
    next(err);
    })
};

exports.login=(req,res,next)=>{
    const email=req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email:email})
    .then(user=>{
        if(!user)
        {
            const error = new Error('No user found with this email');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password,user.password);
    })
    .then(isEqual=>{
        if(!isEqual)
        {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
        {
            email:loadedUser.email,
            userId:loadedUser._id.toString()

        },'somesupersecretkey',
        {
            expiresIn:'1h'
        });
        res.statusCode(200).json({message:'login successful',token:token,userId:loadedUser._id.toString()});
    })
    .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode=500;
        }
    next(err);
    });

}