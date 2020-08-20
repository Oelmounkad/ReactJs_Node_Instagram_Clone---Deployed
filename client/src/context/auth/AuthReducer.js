import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from '../types'

export default (state,action) => {
    switch(action.type){
        case USER_LOADED:
            localStorage.setItem('user',JSON.stringify(action.payload) ) // to persist user in localStorage
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('isAuth','true')
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                error: null
            }
            case LOGOUT:
            case REGISTER_FAIL:
            case AUTH_ERROR:
            case LOGIN_FAIL:
            
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
            
        default:
            return state
    }
}