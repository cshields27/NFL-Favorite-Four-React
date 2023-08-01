import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

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
    <Router>
      <div>
        <Route component={Home} exact path="/" />
        <Route component={About} exact path="/about" />
        <Route component={SubmitPicks} exact path="/submit-picks"/>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
