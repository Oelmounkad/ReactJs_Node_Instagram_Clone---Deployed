import React from 'react'
import moment from 'moment'
const PostItem = ({post}) => {
    return (
        <div class="photo">
        <header class="photo__header">
            <img src="images/avatar.jpg" class="photo__avatar" />
            <div class="photo__user-info">
                <span class="photo__author">{post.user.name}</span>
                <span class="photo__location">Bestechung</span>
            </div>
        </header>
        <img width="100%" src={post.img_url} />
        <div class="photo__info">
            <div class="photo__actions">
                <span class="photo__action">
                <i class="far fa-heart fa-lg"></i>
                </span>
                <span class="photo__action">
                <i class="far fa-comment fa-lg"></i>
                </span>
            </div>
            <span class="photo__likes">{post.likes} likes</span>
           
            <ul class="photo__comments"> 
            {post.comments.map( comment => 
                <li class="photo__comment">
                <span class="photo__comment-author">{comment.user.name}</span> {comment.content}
            </li>
                )}
                
            </ul>
            <span class="photo__time-ago">{ moment(post.date).fromNow() }</span>
            <div class="photo__add-comment-container">
                <textarea name="comment" placeholder="Add a comment..."></textarea>
                <i class="fa fa-ellipsis-h"></i>
            </div>
        </div>
    </div>
    )
}
export default PostItem