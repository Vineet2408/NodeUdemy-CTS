const express = require('express');
const userController = require('../controller/userController');

const userRouter = express.Router();


userRouter.get('/allProducts',userController.getAllProducts);

userRouter.get('/products',userController.getAllProducts);

module.exports = userRouter;
