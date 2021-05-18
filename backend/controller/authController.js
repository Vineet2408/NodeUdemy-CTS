const User = require('../models/user');
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.postAddUser=(req,res,next)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        const error = new Error('Validation failed.');
        error.statusCode=422;
        error.data = errors.array();
        throw error;
    }
    const password = req.body.password;
    bcrypt.hash(password,12)
    .then(hashedPw=>{

        User.create({
            name:req.body.name,
            age:req.body.age,
            profilePic:req.body.profilePic,
            contact:req.body.contact,
            email:req.body.email,
            password:hashedPw,
            lastName:req.body.lastName,
            role:'user'
        })
        .then(result => {
            res.json({message:'user added successfully',user:result});
        })
        .catch(err =>{
            console.log(err);
            res.json({message:'user not added ,server error', error:err});
        });


    })
    .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode=500;
        }
        next(err);
    });
  
}


exports.login=(req,res,next)=>{
    console.log('inside login');
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    User.findOne({where:{email:email}})
    .then(user=>{
        if(!user)
        {
            const error = new Error('user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password,user.password);
       
    })
    .then(isEqual=>{
        if(!isEqual)
        {
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                email:loadedUser.email,
                userId:loadedUser.id.toString()
            },'secretkey',{expiresIn:'1h'}
            );
            const role = loadedUser.role;
            res.status(200).json({token:token,userId:loadedUser.id,message:'login successful',role:role,userId:loadedUser.id});
    })
    .catch(err=>{
        res.json({message:'server error : '+err.message,error:err});
    })

}
