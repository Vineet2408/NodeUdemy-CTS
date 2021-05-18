const {validationResult} = require('express-validator/check');
const Post = require('../models/post')
const fs = require('fs');
const path = require('path');
const User = require('../models/User');


let creator;

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perpage = 2;
  let totalItems;
  Post.find().countDocuments()
  .then(count=>{
    totalItems = count;
    return Post.find().skip((currentPage - 1)*perPage).limit(perPage);
  })
  .then(posts=>{
    res.status(200).json({message:'Post fond successfully',posts:post,totalItems:totalItems});
  })
  .catch(err=>{
    if(!err.statusCode)
    {
      err.statusCode=500;
    }
    next(err);
  });
};

exports.createPost = (req, res, next) => {

  const errors=validationResult(req);

  if(!errors.isEmpty())
  {
    const error = new Error('validation failed');
    error.statusCode=422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;

   // Create post in db
  const post = new Post({
    title: title, 
    content: content ,
    imageUrl:'',
    creator :req.userId
    });

    post.save()
    .then(result=>{
      return User.findById(req.userId);
    })
    .then(user=>{

      creator = user;
      user.posts.push(post);
      console.log(user);

      return user.save();
     
    })
    .then(result=>{
      res.status(201).json(
        {
          message: 'Post created successfully!',
          post: post,
          creator:{_id : creator._id,name:creator.name}
        });
  
    })
    .catch(err=>{
      console.log(err);
      if(!err.statusCode)
      {
        err.statusCode=500;
      }
      next(err);
    });
};

exports.getPost=(req,res,next)=>{

  const postId = req.params.postId;
  Post.findById(postId).then(post=>{
    if(!post)
    {
      const error = new Error('Could not find Post.');
      erros.statusCode=404;
      throw error;
    }
    res.status(200).json({message:'Post fetched', post:post});
  })
  .catch(err=>{
    if(!err.statusCode)
    {
      err.statusCode=500;
    }
    next(err);
  })
};

exports.updatePost=(req,res,next)=>{
  const postId = req.params.postId;

  const errors=validationResult(req);

  if(!errors.isEmpty())
  {
    const error = new Error('validation failed');
    error.statusCode=422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.image;
  if(req.file)
  {
    imageUrl = req.file.path; 
  }
  if(!imageUrl)
  {
    const error= new Error('No file picked.');
    error.statusCode = 422;
    throw error;  
  }

  Post.findById(postId)
  .then(post=>{
    if(!post)
    {
      const error=new Error('Post not found for update');
      error.statusCode = 404;
      throw error;
    }
    if(post.creator.toString() !== req.userId)
    {
      const error = new Error('Not Authorized!');
      error.statusCode = 403;
      throw error;
    }
    if(imageUrl !== post.imageUrl)
    {
      clearImage(post.imageUrl);
    }
    post.title=title;
    post.content=content;
    post.imageUrl=imageUrl;
    return post.save();
  })
  .then(result=>{
    res.statusCode(200).json({message:'post updated',post:result});
  })
  .catch(err=>{
    if(!err.statusCode)
    {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.deletePost=(req,res,next)=>{
  const postId = req.params.postId;
  Post.findById(postId)
  .then(post=>{
    //check loggedIn user
    if(!post)
    {
      const error=new Error('Could not delete post');
      error.statusCode = 404;
      throw error;
    }
    if(post.creator.toString() !== req.userId)
    {
      const error = new Error('Not Authorized!');
      error.statusCode = 403;
      throw error;
    }
    clearImage(post.imageUrl);
    return Post.findByIdAndRemove(postId);

  })
  .then(result=>{
    return User.findById(req.userId);
  })
  .then(user=>{
    user.posts.pull(postId);
    return user.save();
  })
  .then(result=>{
    console.log(result);
    res.statusCode(200).json({message:'Deleted post'});
  
  })
  .catch(err=>{
    if(!err.statusCode)
    {
      err.statusCode = 500;
    }
    next(err);
  });
}

const clearImage = (filePath) =>{
    filePath = path.join(__dirname,'..',filePath);
    fs.unlink(filePath, err=>{console.log(err);});
};
