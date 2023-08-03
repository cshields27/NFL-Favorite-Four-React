import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './authContext';


import './style.css'
import Home from './views/home'
import About from './views/about';
import SubmitPicks from './views/submitpicks'

import firebaseConfig from './firebaseConfig';

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

const App = () => {
  return (
    <GoogleOAuthProvider clientId='326321185901-sfhn7khp0t1hr8vkc95ph6se20j1k300.apps.googleusercontent.com'>
    <AuthProvider>
    <Router>
      <div>
        <Route component={Home} exact path="/" />
        <Route component={About} exact path="/about" />
        <Route component={SubmitPicks} exact path="/submit-picks"/>
      </div>
    </Router>
    </AuthProvider>
    </GoogleOAuthProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
