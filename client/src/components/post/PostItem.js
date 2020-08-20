import React,{useContext, useState} from 'react'
import moment from 'moment'

import PostContext from '../../context/post/PostContext'

const PostItem = ({post}) => {

    const postContext = useContext(PostContext)
    const {postAddLike,postDeletelike} = postContext

    const likeorUnlike = id => {
        post.likers.filter(liker => liker._id == JSON.parse(localStorage.getItem('user'))._id ).length !== 0 ?
        postDeletelike(id) : postAddLike(id)
    }

    const [comment, setComment] = useState('')

    const onChangeCom = e => {
        setComment(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        console.log(comment)

    }


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
                <span onClick={() => likeorUnlike(post._id)} class="photo__action">
                <i class={ post.likers.filter(liker => liker._id == JSON.parse(localStorage.getItem('user'))._id ).length !== 0 ? "fas fa-heart fa-lg ico-red" :"far fa-heart fa-lg"}></i>
                </span>
                <span class="photo__action">
                <i class="far fa-comment fa-lg"></i>
                </span>

            </div>
            <span class="photo__likes">{post.likes} likes</span>
         
            <span class="photo__time-ago">{ moment(post.date).fromNow() }</span>
            
                <form class="photo__add-comment-container" onSubmit={onSubmit}>
                <textarea name="comment" placeholder="Add a comment..." value={comment} onChange={onChangeCom} ></textarea>
                <input type="submit" value="Publier" />
                </form>
            
        </div>
    </div>
    )
}
export default PostItem