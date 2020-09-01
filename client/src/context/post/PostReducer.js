import {
    GET_ALL_POSTS,
    ADD_POST,
    POST_ERROR,
    POST_ADD_LIKE,
    POST_DELETE_LIKE,
    ADD_COMMENT,
    COMMENT_ERROR
} from '../types'

export default (state,action) => {
    switch(action.type){
        case GET_ALL_POSTS: 
        return {
            ...state,
            allPosts : action.payload
        }
        case ADD_POST: 
        return {
            ...state,
            allPosts : [action.payload, ...state.allPosts]
        }
        case POST_ADD_LIKE:
            return {
                ...state,
                allPosts : state.allPosts.map(post => post._id === action.payload.postid ? 
                    { ...post, likes: post.likes+1 , 
                        likers: [ action.payload.liker,...post.likers]  }: post)
            }
        case POST_DELETE_LIKE:
                return {
                ...state,
                allPosts : state.allPosts.map(post => post._id === action.payload.postid ? 
                    { ...post, likes: post.likes-1 , likers: post.likers.
                        filter(liker => liker._id !== action.payload.liker._id)  }: post)
                }
        case POST_ERROR:
        case COMMENT_ERROR: 
        return {
            ...state,
            error : action.payload
        }
        case ADD_COMMENT:
            return{
                ...state,
                allPosts : state.allPosts.map(post => post._id === action.payload.post ?
                     {...post , comments: [...post.comments, action.payload] } : post
                    )
            }
        default:
            return state
    }
}