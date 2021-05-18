const Product = require('../models/product');
const User = require('../models/user')

exports.postAddProduct=(req,res,next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description
    })
    .then(result => {
        console.log(result);
    })
    .catch(err =>{
        console.log(err);
    });
}


exports.getAllUser=(req,res,next)=>{
    const currentPage = req.query.page || 1;
    const noOfItemsPerPage = 2;
    let totalItems;
   
    User.findAll()
    .then(users=>{
        totalUsers = users.length;
        console.log(totalUsers);
        let userList =[];
        let start = currentPage * noOfItemsPerPage -noOfItemsPerPage +1;
        let end = currentPage * noOfItemsPerPage;

        console.log('currentPage = ',currentPage);
        console.log('start = ',start);
        console.log('end = ',end);
        for(let i = start-1;i<end;i++)
        {
            if(users[i])
            {
                userList.push(users[i]);
            }
            else{
                break;
            }
        }
        res.json({message:'All products ',users:userList,totalUsers:totalUsers})
    })
    .catch(err=>{
        res.json({message:'error in get All User Api',error:err.message});
    });
};


exports.updateUser=(req,res,next)=>{
    const userId = req.params.userId;
    console.log(userId);
    const name = req.body.name;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const contact = req.body.contact;
    const email = req.body.email;
    const profilePic = req.body.profilePic;
    User.findByPk(userId)
    .then(user=>{
        user.name=(name)?name:user.name;
        user.lastName=(lastName)?lastName:user.lastName;
        user.age=(age)?age:user.age;
        user.contact=(contact)?contact:user.contact;
        user.email=(email)?email:user.email;
        user.password=user.password;
        user.profilePic=(profilePic)?profilePic:user.profilePic;
        return user.save();
    })
    .then(result=>{
        res.json({message:'user updated',updatedUser:result});
    })
    .catch(err=>{
        console.log('error');
        console.log(err);
        res.json({message:'server',error:err});

    });
}

exports.getUser=(req,res,next)=>{
    const userId = req.params.userId;
    User.findByPk(userId)
    .then(user=>{
        res.json({message:'user found',user:user});
    })
    .catch(err=>{
        console.log(err);
        res.json({message:'error',error:err});
    });

}

exports.postUpdateProduct=(req,res,next)=>{
    const prodId = req.params.prodId;
    const title = req.body.title;
    const price =(+ req.body.price);
    const desc = req.body.description;
    const imageUrl = req.body.imageUrl;

    Product.findByPk(prodId)
    .then(prod=>{
        prod.title=(title)?title:prod.title;
        prod.price=(price>0)?price:price.title;
        prod.description=(desc)?desc:prod.description;
        prod.imageUrl=(imageUrl)?imageUrl:prod.imageUrl;

        return prod.save();
    })
    .then(result=>{
        res.json({message:'product updated',updatedProduct:result});
    })
    .catch(err=>{
        console.log('error');
        console.log(err);
        res.json({message:'server',error:err});
    });
}

