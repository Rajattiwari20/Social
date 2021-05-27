const Comment = require('../models/commnet');
const Post = require('../models/post');

module.exports.create = async function(req, res){

    try {
        let post = await Post.findById(req.body.post);
   
        if(post){

        let comment = await Comment.create ({
            content : req.body.content,
            post : req.body.post,
            user : req.user._id,
         });

         if(req.xhr){
            return res.status(200).json({
            data:{
              commont : commont
            }, 
            message : "comment created !!"
          })
        }
             
         

        post.comments.push(comment);
            post.save();
            req.flash('success' , 'Comment Added');
            res.redirect('/');
}
    } catch (error) {
        req.flash('errpr' , err);
    }

}



module.exports.destroy = async function(req , res){
    try {
        let comment = await Comment.findById(req.params.id);

    if(comment.user == req.user.id){

        let postId = comment.post;
        comment.remove();
        req.flash('success' , 'Comment Deleted');
        
        let post = await Post.findByIdAndUpdate(postId, {$pull: 
            {comments : req.id}});

            return res.redirect('back');
        }

    else{
        return res.redirect('back');
    }
    } catch (error) {
        req.flash('error' , error);
    }
}