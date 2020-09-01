import React,{useContext, useState} from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import PostContext from '../../context/post/PostContext'
import AuthContext from '../../context/auth/AuthContext'
const PostItem = ({post}) => {

    

    const postContext = useContext(PostContext)
    const {postAddLike,postDeletelike,commentPost} = postContext

    const authContext = useContext(AuthContext)
    const {user} = authContext

    const likeorUnlike = id => {
        post.likers.filter(liker => liker._id == user._id ).length !== 0 ?
        postDeletelike(id) : postAddLike(id)
    }

    const [comment, setComment] = useState('')

    const onChangeCom = e => {
        setComment(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()

        const data = {
            post_id : post._id,
            commentData: comment
        }

       // console.log(comment)

        commentPost(data)
        setComment('')

    }


    return (
        <>
 {post !== null && user !== null &&  <div class="photo">
           
        <header class="photo__header">
            <Link to={`/${post.user._id}`}>
            <img src={post.user.profile_pic} class="photo__avatar" />
            </Link>
            
            <div class="photo__user-info">
                <span class="photo__author">
                <Link style={{textDecoration: 'none'}} to={`/${post.user._id}`}>
                    {post.user.name}
                    </Link>
                    </span>
                <span class="photo__location">{post.location}</span>
            </div>
            <i class="fas fa-ellipsis-h"></i>
        </header>
        <img width="100%" src={post.img_url} />
        <div class="photo__info">
            <div class="photo__actions">
                
                <span onClick={() => likeorUnlike(post._id)} class="photo__action">
                <i class={ post.likers.filter(liker => liker._id == user._id ).length !== 0 ? "fas fa-heart fa-lg ico-red" :"far fa-heart fa-lg"}></i>
                </span>

                <span class="photo__action">
                <i class="far fa-comment fa-lg"></i>
                </span>

            </div>
    <span class="photo__likes">{post.likes} { post.likes === 1 ? 'like' : 'likes' } </span>
            <ul class="photo__comments">
            <li class="photo__comment">
            <Link style={{textDecoration: 'none'}} to={`/${post.user._id}`}>
                        <span class="photo__comment-author">{post.user.name}</span></Link> {post.title}
                    </li>
                { post.comments.map( comment => 
                     <li class="photo__comment">
                         <Link style={{textDecoration: 'none'}} to={`/${comment.user._id}`}>
                        <span class="photo__comment-author" style={{cursor: 'pointer'}}>{comment.user.name}</span></Link> {comment.content}
                    
                    </li>
                    ) }
                   
                </ul>
            <span class="photo__time-ago">{ moment(post.date).fromNow() }</span>
            
                <form class="photo__add-comment-container" onSubmit={onSubmit}>
                <textarea name="comment" placeholder="Add a comment..." value={comment} onChange={onChangeCom} ></textarea>
                <input type="submit" value="Publier" />
                </form>
            
        </div>
    </div>}
    </>
       
       
    )
}
export default PostItem