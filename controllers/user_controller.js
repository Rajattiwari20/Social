const User = require('../models/user')

module.exports.profile = function(req , res){
    
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id , function(err , user){
            if(err){console.log("Error in finding  user profile") ; return}

            if(user){
                return res.render('user_profile', {
                    title : "User Profile",
                    user : user
                })
            }
        })
    }
    else{
        return res.redirect('/users/sign-in');
    }
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
        
        if(err){console.log("Error in finding user in signing in") ; return}
       

        if(!user){
            User.create(req.body , function(err , user){
               

                if(err){console.log("Error in creating  user while signing in") ; return}

                
                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

//sign in and create a session for the user
module.exports.createSession = function(req , res){
    
    //find the user

    User.findOne({email : req.body.email} , function(err,user){
        
            if(err){console.log("Error in creating  user while signing in") ; return}
            //handel user found 
            if(user){
                //handel password which doesn't match
                if(user.password != req.body.password){
                    return res.redirect('back');
                }

                //handel session creation
                res.cookie('user_id' , user.id);
                return res.redirect('/users/profile');
            }

            //handel user not found
            else{
                return res.redirect('back');
            }
        
    })

   
}

module.exports.signOut = function(req, res){


    return req.cookies.user_id = null;
    

}