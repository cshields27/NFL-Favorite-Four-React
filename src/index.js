import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './authContext';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


import './style.css'
import Home from './views/home'
import About from './views/about';
import SubmitPicks from './views/submitpicks'
import Leagues from './views/leagues'
import Terms from './views/terms'
import User from './views/user'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const options = {
    timeout: 1500, // Duration in milliseconds (3 seconds in this case)
    position: positions.MIDDLE,
    transition: transitions.SCALE,
}

const SimpleAlertTemplate = ({ message, close }) => {
  return (
    <div style={{
      padding: '10px',
      backgroundColor: 'rgba(0,0,0,1)',
      color: 'white',
      borderRadius: '5px',
      textAlign: 'center',
      width: 'fit-content',
      margin: 'auto'
    }}>
      {message}
    </div>
  );
}

const App = () => {
  return (
    <GoogleOAuthProvider clientId='326321185901-sfhn7khp0t1hr8vkc95ph6se20j1k300.apps.googleusercontent.com'>
    <AuthProvider>
    <AlertProvider template={SimpleAlertTemplate} {...options}>
    <Router>
      <ScrollToTop />
      <div>
        <Route component={Home} exact path="/" />
        <Route component={Leagues} exact path="/leagues"/>
        <Route component={About} exact path="/about" />
        <Route component={SubmitPicks} exact path="/submit-picks"/>
        <Route component={User} exact path="/profile"/>
        <Route component={Terms} exact path="/terms-of-service"/>
      </div>
    </Router>
    </AlertProvider>
    </AuthProvider>
    </GoogleOAuthProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
