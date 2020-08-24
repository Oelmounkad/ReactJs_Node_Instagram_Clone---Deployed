import React, { useReducer,useContext } from 'react'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

import PostContext from './PostContext'
import PostReducer from './PostReducer'

import AuthContext from '../auth/AuthContext'


import {
    GET_ALL_POSTS,
    POST_ERROR,
    POST_ADD_LIKE,
    POST_DELETE_LIKE,
    ADD_COMMENT,
    COMMENT_ERROR
} from '../types'


const PostState = props => {

const authContext = useContext(AuthContext)
const {user} = authContext


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

    // Post Add Like
    const postAddLike = async (id) => {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.put(`/api/posts/like/${id}`)
            const liker = {
                _id:user._id,
                name: user.name
            }
            const data = {
                liker,
                postid: res.data._id
            }
            dispatch({
                type: POST_ADD_LIKE,
                payload: data
            })
          
        } catch (err) {
            dispatch({
                type : POST_ERROR,
                payload: err.response.data 
            })
        }
    }

       // Post delete Like
       const postDeletelike = async (id) => {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.put(`/api/posts/unlike/${id}`)
            const liker = {
                _id:user._id,
                name: user.name
            }
            const data = {
                liker,
                postid: res.data._id
            }
            dispatch({
                type: POST_DELETE_LIKE,
                payload: data
            })
          
        } catch (err) {
            dispatch({
                type : COMMENT_ERROR,
                payload: err.response.data 
            })
        }
    }


    // Comment a post
    const commentPost = async (parameterData) => {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
             const data = {
            user : user._id ,
            post : parameterData.post_id ,
            content : parameterData.commentData
        }
        const res = await axios.post('/api/comments',data)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        } catch (err) {
            dispatch({
                type : COMMENT_ERROR,
                payload: err.response.data 
            })
        }
       
        
    }



   return (
       <PostContext.Provider 
       value={{
        allPosts: state.allPosts,
        error: state.error,
        getAllPosts,
        postAddLike,
        postDeletelike,
        commentPost
       }}>

           {props.children}
       </PostContext.Provider>
   )

}
export default PostState