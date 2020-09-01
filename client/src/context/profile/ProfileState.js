import React, { useReducer,useContext } from 'react'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

import ProfileContext from './ProfileContext'
import ProfileReducer from './ProfileReducer'

import {
    SET_PROFILE,
    ERROR_PROFILE
} from '../types'


const ProfileState = props => {

    const initialState = {
        profileData: null,
        profilePosts: null,
        error: null
    }

   const [state, dispatch] = useReducer(ProfileReducer, initialState)

   // Action :

   const getProfile = async id => {
        try {
            const user = await axios.get(`/api/users/${id}`)

            const userPosts = await axios.get(`/api/posts/user/${id}`)

            const data = {
                user: user.data,
                userPosts: userPosts.data
            }
            dispatch({
                type: SET_PROFILE,
                payload: data
            })

        } catch (err) {
            console.log(err.response.data)
            dispatch({
                type: ERROR_PROFILE,
                payload: err.response.data
            })
        }
       

   }

   //Edit Profile
   const editProfile = async (userid,pData,base64) => {
       
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

       try {
        pData.profile_pic = base64
        await axios.put(`/api/users/${userid}`,pData)

       } catch (err) {

        dispatch({
                type: ERROR_PROFILE,
                payload: err.response.data
            })
       }
   }


   return (
       <ProfileContext.Provider 
       value={{
        profileData: state.profileData,
        profilePosts: state.profilePosts,
        getProfile,
        editProfile
       }}>

           {props.children}
       </ProfileContext.Provider>
   )

}
export default ProfileState