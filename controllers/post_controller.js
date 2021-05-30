const Post = require('../models/post');
const Comments = require('../models/commnet');

module.exports.create = async function(req, res){

    try {
        
        let post = await Post.create({
            content : req.body.content,
            user : req.user._id
        });

        if(req.xhr){
          return res.status(200).json({
            data:{
              post : post
            }, 
            message : "Post created !!"
          })
        }

        req.flash('success' , 'Post Added');
        return res.redirect('back');

    } catch (err) {
        req.flash('error' , err);
    }

}   


module.exports.destroy = async function(req , res){
 
  try {
    let post =  await Post.findById(req.params.id );

    if(post.user == req.user.id){
     post.remove();
     
     await Comments.deleteMany({post : req.params.id });

     if(req.xhr){
       return res.status(200).json({
         data : {
           post_id : req.params.id ,
      
         },
         message : "post deleted"
       })
     }
    

     req.flash('success' , 'Post Deleted');
 
     return res.redirect('back');
 
     }
     else{
         return res.redirect('back');
     }
  } catch (error) {
    req.flash('error' , err);
  }
}