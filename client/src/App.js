import React from 'react';

import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';

import './App.css';
import Login from './components/auth/Login';
import Feed from './components/pages/Feed'
import Profile from './components/pages/Profile'
import Navbar from './components/layout/Navbar';

import AuthState from '../src/context/auth/AuthState'
import PostState from './context/post/PostState';
import ProfileState from './context/profile/ProfileState';

import PrivateRoute from './routing/PrivateRoute';

import About from './components/pages/About';

const App = () => {

  return (
    
    <AuthState>
      <PostState>
        <ProfileState>
    <Router>

     <Navbar />
    
      <Switch>
      
      <PrivateRoute exact path="/" component={Feed} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/about" component={About} />
      <Route exact path="/:userId" component={Profile} />

      </Switch>

    </Router>
    </ProfileState>
    </PostState>
    </AuthState>
    
  );
}

export default App;
