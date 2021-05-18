const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine','ejs');
app.set('views', 'views');

mongoose.connect('');

app.listen(3000);