const express = require('express');
const {body} = require('express-validator/check')

const authContoller = require('../controllers/auth');
const router = express.Router();

router.put("/signup",[
    body('email').isEmail().withMessage('Please enter the valid email')
    .custom((value,{req})=>{
        return User.findOne({email:value})
        .then(userDoc=>{
            if(userDoc)
            {
                return Promeise.reject('Mail address already exists!');

            }
        });
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:8}),
    body('name').trim().not().isEmpty()

],authContoller.singup);

router.post('/login',authContoller.login);
modue.exports = router;