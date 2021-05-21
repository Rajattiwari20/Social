const Comment = require('../models/commnet');
const Post = require('../models/post');

module.exports.create = function(req, res){

    Post.findById(req.body.post , function(err, post){

        if(post){
            Comment.create ({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id,
            }, function(err , commnet){
                post.comments.push(commnet);
                post.save();

                res.redirect('/');
            })
        }
    })

}

module.exports.destroy = function(req , res){
    Comment.findById(req.params.id , function(err , comment){
        if(comment.user == req.user.id){

            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, {$pull: {comments : req.id}}, function(err , post){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}