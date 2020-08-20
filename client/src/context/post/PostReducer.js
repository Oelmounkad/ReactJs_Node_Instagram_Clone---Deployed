import {
    GET_ALL_POSTS,
    POST_ERROR
} from '../types'

export default (state,action) => {
    switch(action.type){
        case GET_ALL_POSTS: 
        return {
            ...state,
            allPosts : action.payload
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