const Product = require('./models/product');
const User = require('./models/user');
const sequelize = require('./util/database');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const password = 'admin123';
bcrypt.hash(password,12)
.then(hashedPw=>{

    User.create({
        name:'admin',
        age:100,
        profilePic:'https://www.logolynx.com/images/logolynx/23/23938578fb8d88c02bc59906d12230f3.png',
        contact:9797979797,
        email:'admin@gmail.com',
        password:hashedPw,
        lastName:'admin',
        role:'admin'
    })
    .then(result => {
    })
    .catch(err =>{
        console.log(err);
    });
});


sequelize.sync().then(result=>{
    console.log('server started');
    app.listen(8080);

})
.catch(err=>{
    console.log('sequelize error = ',err);
});


