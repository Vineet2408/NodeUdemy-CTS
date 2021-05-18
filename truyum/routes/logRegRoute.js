const express = require('express');

const logRegController = require('../controller/logRegController');

const router = express.Router();

router.post('/login',logRegController.postLoginUser);

router.post('/register-user',logRegController.postRegisterUser);

