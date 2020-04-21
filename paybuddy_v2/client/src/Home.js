/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Button, Header } from 'semantic-ui-react';
import PayBuddy from './img/paybuddytext.png';
import './home.css'

const Home = () => {
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
      <div>Loading...</div>
    );
  }

  return (
    <div class='homecontainer'>
      <div>
        <img src={PayBuddy}></img>
        <hr></hr>
        <h1>E-Wallet Service</h1>

        { authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        <span id='welcome'>
          {authState.isAuthenticated && userInfo
          && (
          <div>
              Welcome back, {userInfo.name}!
          </div>
          )}
        </span>

        {!authState.isAuthenticated
        && (
        <div>
          You have logged out, log in again to continue!
          <div id='loginbutton'>
            <Button id="login-button" primary onClick={login}>Login</Button>
          </div>
        </div>
        )}

      </div>
    </div>
  );
};
export default Home;
