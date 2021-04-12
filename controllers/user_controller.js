module.exports.profile = function(req , res){
    res.render('user_profile', {
        title : 'Profile'
    })
}

module.exports.post = function(req , res){
    return res.end('<h1>user post </h1>');
}