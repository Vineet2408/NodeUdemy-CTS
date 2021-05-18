//import routes
const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home')
//importing body parser and express
const bodyParser = require('body-parser')
const express = require('express');
//import path module
const path = require('path');

const expApp = express();

expApp.use(bodyParser.urlencoded({extended:false}));

//routes
expApp.use((req,res,next)=>{
    console.log('in the mexpress middleware using next()');
    next();
});

expApp.use('/home',(req,res,next)=>{
    console.log('home');
    res.sendFile(path.join(__dirname,'../','views','home.html'));
});


expApp.use('/products',(req,res,next)=>{
    console.log('products');
    res.send('hello products');
});

expApp.use(adminRoutes);
expApp.use(homeRoutes);

expApp.use('/',(req,res,next)=>{
    console.log('using res.send()');
    res.sendFile(path.join(__dirname,'./','views','home.html'));

});



expApp.listen(9000);