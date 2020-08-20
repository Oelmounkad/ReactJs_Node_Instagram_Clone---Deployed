import React,{useState,useContext,useEffect} from 'react'


import phoneImage from '../../images/login/phoneImage.png'
import loginLogo from '../../images/login/loginLogo.png'

import iosLogo from '../../images/login/ios.png'
import androidLogo from '../../images/login/android.png'

import AuthContext from '../../context/auth/AuthContext'


 const Login = (props) => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [localError, setLocalError] = useState('')

    const authContext = useContext(AuthContext)
    const {login,isAuthenticated,error} = authContext

    useEffect(() => {

        if(isAuthenticated){
            props.history.push('/')
        }
        if(error){
            setLocalError(error)
        }

        // eslint-disable-next-line
    },[error,isAuthenticated,props.history])


    const onChange = e => {
        setUser({...user, [e.target.name]:e.target.value })
    }
    const onSubmit = e => {
        e.preventDefault()

        // Login
        login(user)
    }

    return (
        <main id="login">
        <div className="login__column">
            <img src={phoneImage} className="login__phone" />
        </div>
        <div class="login__column">
            <div class="login__box">
                <img src={loginLogo} className="login__logo" />

                <form onSubmit={onSubmit} class="login__form">
                    <input type="email" name="email" placeholder="Email" value={user.email} onChange={onChange} required />
                    <input type="password" name="password" placeholder="Password" value={user.password} onChange={onChange} required />
                    <input type="submit" value="Log in" />
                </form>

                <p style={{color: 'red'}}> {localError} </p>

                <span class="login__divider">or</span>
                <a href="#" class="login__link">
                <i class="fab fa-facebook-square"></i>
                    Log in with Facebook
                </a>

                


                <a href="#" class="login__link login__link--small">Forgot password</a>
            </div>
            <div class="login__box">
                <span>Don't have an account?</span> <a href="#">Sign up</a>
            </div>
            <div class="login__box--transparent">
                <span>Get the app.</span>
                <div class="login__appstores">
                    <img src={iosLogo} class="login__appstore" alt="Apple appstore logo" title="Apple appstore logo" />
                    <img src={androidLogo} class="login__appstore" alt="Android appstore logo" title="Android appstore logo" />
                </div>
            </div>
        </div>
    </main>
    )
}

export default Login