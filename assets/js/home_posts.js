{   
    // method to submit the form data for new post using AJAX
   
    let createPost = function(){
                let newPostForm = $('#new-post-form');
        
                newPostForm.submit(function(event){
                    event.preventDefault();
                    $.ajax({
                        type : 'post',
                        url : '/posts/create',
                        data: newPostForm.serialize(),
                        success : function(data){
                            let newPost = newPostDom(data.data.post);
                            $('#user-post> ul').prepend(newPost);
                            deletePost($('.delete-post-btn' , newPost));
                        },
                        error : function(err){
                            console.log(err.responseText);
                        }
                    })
                });
            }

    // method to create a post in DOM
 

        let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        
          <small>
            <a class="delete-post-btn" href="/posts/destroy/${ post._id }">X</a>
          </small>
        
          <p> 
          ${post.content} 
            <br>
            ${post.user.userName }
          </p>
    
          <div class="post-comment">
    
            
                <form action="/comments/create" method="POST">
                <input type="text" name="content" id="" placeholder="Type here to add comment ..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Commnet">
    
                </form>
          
    
                <div class=" post-comments-list">
                  
                  <ul id="post-comments-${ post._id}">

                  </ul>
                     
                </div>
    
          </div>
      </li>`)
    }

    //method to delete post from dom

    let deletePost = function(deleteLink){
      $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
          type : 'get',
          url : $(deleteLink).prop('href'),
          success : function(data){
                console.log(data.data.post_id)
                $(`#post-${data.data.post_id}`).remove();
          },
          error : function(error){
            console.log(error.responseText);
          }
        })
      })
    }



    createPost();
}
