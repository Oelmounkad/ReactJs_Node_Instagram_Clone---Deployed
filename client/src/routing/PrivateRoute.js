import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../context/auth/AuthContext'

 const PrivateRoute = ({component: Component, ...rest}) => {

  const  authContext = useContext(AuthContext)

    return (
        <Route {...rest } render={props => !authContext.isAuthenticated ? (
            <Redirect to='/login' />
        ) : (
            <Component  {...props} />
        ) } />

    )
}
export default PrivateRoute