import { useOktaAuth } from '@okta/okta-react'
import React, { useState, useEffect, Component } from 'react'
import { Button } from 'semantic-ui-react'
import Confirm from './Confirm'
import PayBuddyLogo from './img/paybuddy.png'
import './Home.css'
import './fade-in.css'

const HomeMain = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  const login = async () => {
    authService.login('/');
  };

  if (authState.isPending) {
    return (
      <div class='fade-in-fast' id='loading'>Loading...</div>
    );
  }

  return (
    <div>
      {
        authState.isAuthenticated && !userInfo &&
        <div class='fade-in-fast' id='loading'>
          Loading your information...
        </div>
      }

      {
        authState.isAuthenticated && userInfo && <Confirm user={userInfo}/>
      }

      {!authState.isAuthenticated
      && (
      <div class='fade-in' id='background'>  
        <div class='homecontainer basic-font'>
          <img alt='' src={PayBuddyLogo}></img>
          <h1>E-Wallet Application</h1>
          <hr id='homehr'></hr>
          You have logged out, log in again to continue!
          <div id='login-button'>
            <Button id="login-button" primary onClick={login}>Login</Button>
          </div>
        </div>
      </div>
      )}

    </div>
  );
};

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    localStorage.setItem('merchant_id', this.props.match.params.merchant_id);
    localStorage.setItem('amount', this.props.match.params.amount);

    return (
      <HomeMain />
    )
  }
}

export default Home;
