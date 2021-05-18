const express = require('express');

const app = express()

app.use(bodyParser.urlencoded({extended:false}));

app.use('/user',(req,res,next)=>{
    console.log('this is url " / " ');
    res.write('<h1>Hi this is middleware for /user </h2>');

});

app.use('/',(req,res,next)=>{
    console.log('this middleware is url " / " ');
    res.write('<h1>Hi this is middleware for / -> localhost:3000 </h2>');

});

/*
app.use((req,res,next)=>{
    console.log("this is middleware with next");
    next();
});
app.use((req,res,next)=>{
    console.log("this is second middleware with res.write ");
    res.write('<h1>Hi this is second middleware</h2>');
});

*/


app.listen(3000);