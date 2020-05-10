import React from 'react';
import { BrowserRouter as Router, Route , useHistory} from 'react-router-dom';
import {Security, SecureRoute, LoginCallback} from '@okta/okta-react';
import Header from './Header';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import Login from './Login';
import Dashboard from './Dashboard';
import PayBill from './PayBill';
import AddFriend from './AddFriend';
import config from './config';
import Home from './Home';
import FundsDeposit from './FundsDeposit';
import UserTransfer from './UserTransfer';

const HasAccessToRouter = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };
  return (
    <Security {...config.oidc}oAuthRequired={customAuthHandler}>
      <div className="App">
        <Header />
        <NavigationBar/>
        <Route path="/" exact component={Home} />
        <Route path="/implicit/callback" component ={LoginCallback}/>
        <Route path="/login" exact component={Login} />
        <SecureRoute path="/Dashboard" component={Dashboard} />
        <SecureRoute path="/FundsDeposit" component={FundsDeposit} />
        <SecureRoute path="/UserTransfer" component={UserTransfer} />
        <SecureRoute path="/PayBill" component={PayBill} />
        <SecureRoute path="/AddFriend" component={AddFriend} />
        <Footer/>
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