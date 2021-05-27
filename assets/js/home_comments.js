 // method to submit the form data for new comment using AJAX
{
    let createComment = function(){
        let newComment = $('#new-comment-form');

        newComment.submit(function(event){
            event.preventDefault();
            $.ajax({
                type : 'post',
                url : '/comments/create',
                data: newComment.serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.post);
                    $('').prepend(newComment);
                },
                error : function(err){
                    console.log(err.responseText);
                }
            })
        })
    }

    // method to create a post in DOM

    let newCommentDom = function(comment){
        return $(`<li id="comment-${ comment._id }">
        <p>
            
            <small>
                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
            </small>
            
            ${comment.content}
            <br>
            <small>
                ${comment.user.name}
            </small>
        </p>    

</li>`);
    }

    createComment();
}
