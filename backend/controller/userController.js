const Product = require('../models/product');
const User = require('../models/user')

exports.getAllProducts=(req,res,next)=>{
    const currentPage =  req.query.page || 1;
    
    let itemPerPage = 3;
    let end = currentPage * itemPerPage
    let start = end - itemPerPage +1;
    
    Product.findAll()
    .then(products=>{
        let totalProducts = products.length;

        let productList = [];
        for(let i= start -1 ; i < end; i++)
        {
            if(products[i])
            {
                productList.push(products[i]);
            }
            else
            {
                break;
            }
        }
        res.json({message:'All products ',products:productList,totalProducts:totalProducts})
    })
    .catch(err=>{
        res.json({message:'error',error:err});
    });
};

