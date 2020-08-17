import React from 'react'

import phoneImage from '../../images/login/phoneImage.png'
import loginLogo from '../../images/login/loginLogo.png'

import iosLogo from '../../images/login/ios.png'
import androidLogo from '../../images/login/android.png'

 const Login = () => {
    return (
        <main id="login">
        <div className="login__column">
            <img src={phoneImage} className="login__phone" />
        </div>
        <div class="login__column">
            <div class="login__box">
                <img src={loginLogo} className="login__logo" />
                <form action="feed.html" method="get" class="login__form">
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <input type="submit" value="Log in" />
                </form>
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