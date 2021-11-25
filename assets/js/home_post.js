
{
    let creatPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data.data.post);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        });
    }

    let newPostDom = function (post) {
        console.log(post);
        return $(`<li id="post-${post._id}">
        <div class="post-card">
            <div class="post-card-header">
                
                    <small>
                        <a class="delete-post-button" href="/post/destroy/${post._id}">X</a>
                    </small>
                    
            </div>
            
                  <div class="post-content">
                        ${post.content}
                    </div>
                            <br>
                            <small>
                                ${post.user.name}
                            </small>
                    
                
        
            <div class="comments-container">
    
                
                    <form action="/comments/create" method="POST">
                        <textarea class="comment-content" name="content" class="comment-content" placeholder="Add comment"
                        rows="2" cols="20" required></textarea>
                    <input type="hidden" name="post" value="${post._id}">
                    <button type="submit">Add comment</button>
                        
                    </form>
    
                        
                        <div class="posted-comments" id="posted-comments-${post._id}">
                            <ul type="none" id="post-comments-${post._id}">
                                
                            </ul>
                        </div>
                    
            </div>
        </div>
    </li>`);
    }
    //method to delet a post by AJAX
    let deletePost = function (deleteLink) {

        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:function(error){
                    console.log(err,responseText);
                }
            });
        });
    }
    creatPost();

}



