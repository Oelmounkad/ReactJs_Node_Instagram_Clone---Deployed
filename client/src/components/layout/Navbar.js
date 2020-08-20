import React,{useContext} from 'react'
import logo from '../../images/navbar/logo.png'

import AuthContext from '../../context/auth/AuthContext'

const Navbar = () => {
    
    const authContext = useContext(AuthContext);

    const {isAuthenticated} = authContext
    
    const authLinks = (
        <>
          <div class="navigation__column">
            <a href="feed.html">
                
                <img src={logo} />
            </a>
        </div>

               <div class="navigation__column">
            <i class="fa fa-search"></i>
            <input type="text" placeholder="Search" />
        </div>
        <div class="navigation__column">
            <ul class="navigations__links">
            <li class="navigation__list-item">
                    <a href="explore.html" class="navigation__link">
                    <i class="fas fa-paper-plane fa-lg"></i>
                    </a>
                </li>
                <li class="navigation__list-item">
                    <a href="explore.html" class="navigation__link">
                    <i class="far fa-compass fa-lg"></i>
                    </a>
                </li>
                <li class="navigation__list-item">
                    <a href="#" class="navigation__link">
                    <i class="far fa-heart fa-lg"></i>
                    </a>
                </li>
                <li class="navigation__list-item">
                    <a href="profile.html" class="navigation__link">
                    <i class="far fa-user-circle fa-lg"></i>
                    </a>
                </li>
            </ul>
        </div>
        </>
      )

      const guestLinks = (
        <>
        <div class="navigation__column">
            <a href="feed.html">
                
                <img src={logo} />
            </a>
        </div>
        </>
      )
    

    return (
        <nav class="navigation">
      { isAuthenticated ?  authLinks : guestLinks}
    </nav>
    )
}
export default Navbar