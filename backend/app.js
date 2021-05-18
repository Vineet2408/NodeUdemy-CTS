const Product = require('./models/product');
const User = require('./models/user');
const sequelize = require('./util/database');
const express = require('express');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.use(adminRouter);
app.use(userRouter);
app.use(authRouter);

app.use((error,req,res,next)=>{
    console.log(error);
    res.status(error.statusCode)
    .json({message:error.message,data:error.data});

});

sequelize.sync().then(result=>{
    console.log('server started');
    app.listen(8080);

})
.catch(err=>{
    console.log('sequelize error = ',err);
});



