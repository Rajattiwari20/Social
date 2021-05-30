const Post = require('../../../models/post');
const Comments = require('../../../models/commnet');
module.exports.index =  async function(req , res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })

    return res.json(200, {
        message : "List of posts",
        posts : posts,
    })
}

module.exports.destroy = async function(req , res){
 
    try {
      let post =  await Post.findById(req.params.id );
  
      // if(post.user == req.user.id){
       post.remove();
       
       await Comments.deleteMany({post : req.params.id });
  
       return res.json(200, {
        message : "Post and associated comments deleted successfully"
    })
   
    //    }
    //    else{
    //        return res.redirect('back');
    //    }
    } catch (error) {
        return res.json(500, {
            message : "Internal sever error"
        })
    }
  }