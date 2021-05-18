const express = require('express');
const adminController = require('../controller/admin');

const adminRouter = express.Router();

adminRouter.post('/addProduct',adminController.postAddProduct)


adminRouter.post('/updateUser/:userId',adminController.updateUser);

adminRouter.get('/users',adminController.getAllUser);

adminRouter.get('/user/:userId',adminController.getUser);

adminRouter.post('/updateProduct/:prodId',adminController.postUpdateProduct);


module.exports = adminRouter;

