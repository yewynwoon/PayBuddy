import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route , useHistory} from 'react-router-dom';
import {Security, SecureRoute, LoginCallback} from '@okta/okta-react';
import config from './config';
import chair from './chair.jpg';
import Home from './Home.js'
import gif from './giphy.gif';



const HasAccessToRouter = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };
  return (
    <Security {...config.oidc}oAuthRequired={customAuthHandler}>
      <div className="App">
        <Route path="/" exact component={Home} />
      </div>
    </Security>
  );
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render () {
    return (
    <div>
      <Router>
        <HasAccessToRouter/>
      </Router>
    </div>
    );
  }
}

export default App;
