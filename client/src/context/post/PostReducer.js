import {
    GET_ALL_POSTS,
    POST_ERROR,
    POST_ADD_LIKE
} from '../types'

export default (state,action) => {
    switch(action.type){
        case GET_ALL_POSTS: 
        return {
            ...state,
            allPosts : action.payload
        }
        case POST_ADD_LIKE:
            return {
                ...state,
                allPosts : state.allPosts.map(post => post._id === action.payload.postid ? 
                    { ...post, likes: post.likes+1 , likers: [ action.payload.liker,...post.likers]  }: post)
            }
        case POST_ERROR: 
        return {
            ...state,
            error : action.payload
        }
        default:
            return state
    }
}