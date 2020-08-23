import React from 'react';

import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';

import './App.css';
import Login from './components/auth/Login';
import Feed from './components/pages/Feed'
import Navbar from './components/layout/Navbar';

import AuthState from '../src/context/auth/AuthState'
import PrivateRoute from './routing/PrivateRoute';
import PostState from './context/post/PostState';
import About from './components/pages/About';

const App = () => {

  return (
    
    <AuthState>
      <PostState>
    <Router>

     <Navbar />
    
      <Switch>
      
      <PrivateRoute exact path="/" component={Feed} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/about" component={About} />

      </Switch>

    </Router>
    </PostState>
    </AuthState>
    
  );
}

export default App;
