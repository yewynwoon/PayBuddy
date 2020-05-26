import React from 'react'
import { BrowserRouter as Router, Route, useHistory} from 'react-router-dom'
import {Security, LoginCallback} from '@okta/okta-react'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'
import config from './config'
import Home from './Home'
import './App.css'

const HasAccessToRouter = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/');
  };

  return (
    <Security {...config.oidc}oAuthRequired={customAuthHandler}>
      <div className="App">
        <Header/>
        <Route path="/:merchant_id/:amount" exact component={Home} />
        <Route path="/implicit/callback" component ={LoginCallback}/>
        <Route path="/login" exact component={Login} />
      </div>
    </Security>
  );
};

class App extends React.Component {
  render () {
    return (
    <div>
      <Router>
        <HasAccessToRouter/>
      </Router>
      <Footer/>
    </div>
    );
  }
}

export default App;