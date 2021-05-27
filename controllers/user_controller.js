const User = require('../models/user')

module.exports.profile = function(req , res){
    User.findById(req.params.id , function (err , user){

        return res.render('user_profile', {
            title : 'Profile',
            profile_user : user
    
        });
    });
}

module.exports.update = async function (req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id , req.body , function(err, user){
    //         req.flash('success' , 'Updated');
    //         return res.redirect('back');
    //     })
    // }
    
    if(req.user.id == req.params.id){

        try {
            
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req , res, function(error){
                if(error){
                    console.log("******Multer Error" , error)
                }

                console.log(req.file);
            })


        } catch (error) {
            console.log("oneeee")
            req.flash('error' , error);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error' , 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}   

module.exports.post = function(req , res){
    return res.end('<h1>user post </h1>');
}

//render sign up page
module.exports.signUp = function(req , res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    res.render('sign_up' , {
        title: 'Sign Up',
    });
}

//render sign in page
module.exports.signIn = function(req , res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    res.render('sign_in' , {
        title: 'Sign In',
    });
}


//get sign up data
module.exports.create = function(req , res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error' , 'Password not match');
        return res.redirect('back');
    }
    

    User.findOne({email : req.body.email } , function(err ,user){
        if(err){console.log("Error in finding user in signing up") ; return}

        if(!user){
            User.create(req.body , function(err , user){
                if(err){console.log("Error in creating  user while signing up") ; return}
                
                return res.redirect('/users/sign-in')
            })
        }
        else{
            req.flash('success' , 'signUp successfully');
            return res.redirect('back');
        }
    })
}

//sign in and create a session for the user
module.exports.createSession = function(req , res){
    req.flash('success' , 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success' , 'You have logged out !')
    return res.redirect('/');
}

