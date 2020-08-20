import React, { useReducer } from 'react'
import axios from 'axios'


import PostContext from './PostContext'
import PostReducer from './PostReducer'


import {
    GET_ALL_POSTS,
    POST_ERROR
} from '../types'


const PostState = props => {
    const initialState = {
        allPosts: null,
        error: null

    }

   const [state, dispatch] = useReducer(PostReducer, initialState)

   // Action :


     // Get all posts
     const getAllPosts = async () => {
        try {
            const res = await axios.get('/api/posts/all')
            dispatch({
                type: GET_ALL_POSTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: err.response.data
            })
        }
    }

   return (
       <PostContext.Provider 
       value={{
        allPosts: state.allPosts,
        error: state.error,
        getAllPosts
       }}>

           {props.children}
       </PostContext.Provider>
   )

}
export default PostState