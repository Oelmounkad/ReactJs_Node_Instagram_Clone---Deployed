import React from 'react';
/*
import phoneImage from './images/phoneImage.png'
import loginLogo from './images/loginLogo.png'

import iosLogo from './images/ios.png'
import androidLogo from './images/android.png'
*/
import {BrowserRouter as Router , Switch, Route } from 'react-router-dom';

import './App.css';
import Login from './components/auth/Login';
import Home from './components/pages/Home'
import Navbar from './components/layout/Navbar';


function App() {
  return (
    
    <Router>
      <Navbar />
      <Switch>

      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />

      </Switch>

    </Router>
    
  );
}

export default App;
