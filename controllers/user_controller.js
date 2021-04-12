const User = require('../models/user')

module.exports.profile = function(req , res){
    res.render('user_profile', {
        title : 'Profile'
    })
}

module.exports.post = function(req , res){
    return res.end('<h1>user post </h1>');
}

//render sign up page
module.exports.signUp = function(req , res){
    res.render('sign_up' , {
        title: 'Sign Up',
    });
}

//render sign in page
module.exports.signIn = function(req , res){
    res.render('sign_in' , {
        title: 'Sign In',
    });
}


//get sign up data
module.exports.create = function(req , res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    

    User.findOne({email : req.body.email } , function(err ,user){
        if(err){console.log("Error in finding user in signing up") ; return}

        if(!user){
            User.create(req.body , function(err , user){
                if(err){console.log("Error in creating  user while signing up") ; return}

                return res.redirect('/user/sign-in')
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

//sign in and create a session for the user
module.exports.createSession = function(req , res){
    // Todo Later
}