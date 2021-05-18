const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const expApp =express();
expApp.use(bodyParser.urlencoded({extended:false}));

const homeRouter = express.Router();

homeRouter.get('/tryGet',(req,res,next)=>{
    res.send('<h1>hello get</h1>');
});

homeRouter.post('/tryPost',(req,res,next)=>{
    res.send('<form action="/name" method="POST"><input type="text" name="name"><button type="submit">submit</button></form>');
});

homeRouter.get('/tryFile',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','file.html'));
});

homeRouter.post('/name',(req,res,next)=>{
    const s=req.body.name;
    res.send('body = '+s);
});
module.exports = homeRouter;