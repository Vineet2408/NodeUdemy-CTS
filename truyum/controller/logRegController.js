
exports.postLoginUser=(req,res,next)=>{

    const email = req.body.email;
    const password = req.body.password;
    
    res.render('home');
};

exports.postRegisterUser=(req,res,next)=>{

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    res.render('home');
};