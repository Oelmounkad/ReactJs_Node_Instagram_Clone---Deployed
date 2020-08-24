import {
    SET_PROFILE,
    ERROR_PROFILE
} from '../types'

export default (state,action) => {
    switch(action.type){

        case SET_PROFILE:
            return{
                ...state,
                profileData: action.payload.user,
                profilePosts: action.payload.userPosts
            }
         case ERROR_PROFILE:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}