const Post = require('../models/post');
const Comments = require('../models/commnet');

module.exports.create = function(req, res){
    Post.create({
        content : req.body.content,
        user : req.user._id
    }, function(err , post){
        if(err){console.log("Error in creating Post"); return}

        return res.redirect('back');
    });
}   

module.exports.destroy = function(req , res){
    
    Post.findById(req.params.id , function(err , post ){
        console.log (post.id) 
        if(post.user == req.user.id){
            post.remove();
            Comments.deleteMany({post : post.id} , function(err){
                return res.redirect('back');
            })

        }
        else{
            return res.redirect('back');
        }
    })
}