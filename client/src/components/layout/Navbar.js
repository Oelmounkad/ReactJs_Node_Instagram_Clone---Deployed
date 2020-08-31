import React,{useContext} from 'react'
import logo from '../../images/navbar/logo.png'

import AuthContext from '../../context/auth/AuthContext'
import {Link,useHistory} from 'react-router-dom'

const Navbar = () => {
    const history = useHistory()
    const authContext = useContext(AuthContext);

    const {isAuthenticated,user,logout} = authContext
    
    const handleLogout = () => {
        logout()
        history.push('/login')
    }

    const authLinks = (
        <>
          <div class="navigation__column">
          <Link to="/">
            <img src={logo} />
            </Link>
        </div>

               <div class="navigation__column">
            <i class="fa fa-search"></i>
            <input type="text" placeholder="Search" />
        </div>
        <div class="navigation__column">
            <ul class="navigations__links">
            <li class="navigation__list-item">
                    <a href="#" class="navigation__link">
                    <i class="fas fa-paper-plane fa-lg"></i>
                    </a>
                </li>
                <li class="navigation__list-item">
                    <a href="#" class="navigation__link">
                    <i class="far fa-compass fa-lg"></i>
                    </a>
                </li>
                <li class="navigation__list-item">
                    <a href="#" class="navigation__link">
                    <i class="far fa-heart fa-lg"></i>
                    </a>
                </li>
                {user !== null && <li class="navigation__list-item">
                <Link style={{textDecoration: 'none'}} className="navigation__link" to={`/${user._id}`}>
                    <i class="far fa-user-circle fa-lg"></i>
                    </Link>

                </li>
                }
                
                <li class="navigation__list-item">
                <div onClick={handleLogout} style={{cursor: 'pointer'}} className="navigation__link ico-red">
                    <i class="fas fa-power-off fa-lg"></i>
                    </div>

                </li>
                
            </ul>
        </div>
        </>
      )

      const guestLinks = (
        <>
        <div class="navigation__column">
            <Link to="/">
            <img src={logo} />
            </Link>
        </div>
        </>
      )
    

    return (
        <nav class="navigation">
      { isAuthenticated && user !== null ?  authLinks : guestLinks}
    </nav>
    )
}
export default Navbar