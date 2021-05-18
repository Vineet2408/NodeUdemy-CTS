const express = require('express');
const bodyParser = require('body-parser')

const expApp =express();
expApp.use(bodyParser.urlencoded({extended:false}));

const router = express.Router();

router.use('/admin',(req,res,next)=>{

    res.send('hello admin');
});


router.get('/add-product',(req,res,next)=>{
    res.send('<form action="/process-product" method="POST"><input type="text" name="productname"><hr><button type="submit">add</button></form>');
});
router.post('/process-product',(req,res,next)=>{
    console.log('body=');
    console.log(req.body);
    res.send('product added');
});


module.exports = router;