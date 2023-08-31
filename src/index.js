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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const options = {
    timeout: 3000, // Duration in milliseconds (3 seconds in this case)
    position: positions.MIDDLE,
    transition: transitions.SCALE,
}

const App = () => {
  return (
    <GoogleOAuthProvider clientId='326321185901-sfhn7khp0t1hr8vkc95ph6se20j1k300.apps.googleusercontent.com'>
    <AuthProvider>
    <AlertProvider template={AlertTemplate} {...options}>
    <Router>
      <ScrollToTop />
      <div>
        <Route component={Home} exact path="/" />
        <Route component={Leagues} exact path="/leagues"/>
        <Route component={About} exact path="/about" />
        <Route component={SubmitPicks} exact path="/submit-picks"/>
        <Route component={Terms} exact path="/terms-of-service"/>
      </div>
    </Router>
    </AlertProvider>
    </AuthProvider>
    </GoogleOAuthProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
