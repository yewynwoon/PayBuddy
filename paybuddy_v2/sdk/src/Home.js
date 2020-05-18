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
import { Button } from 'semantic-ui-react';
import './Home.css';
import './fade-in.css';
import PayBuddyLogo from './img/paybuddy.png';

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
        authState.isAuthenticated && userInfo &&
        (
          <div className="row">
            <form className="col" method="post" /* onSubmit={this.handleSubmit} */>
              <div className="form-group row">
                <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Merchant: </label>
              </div>

              <div className="form-group row">
                <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Amount: </label>
              </div>

              <div className="form-group row">
                <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Revision: </label>     
              </div>

              <div className="form-group row mb-0">
                <div className="col-md-8 offset-md-4">
                    {/* <Link to={`/project/${this.props.match.params.id}`}>
                        <button className="btn btn-danger">Cancel</button>
                    </Link> */}
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </div>
              </div>
            </form>
        </div>
      )}

      {!authState.isAuthenticated
      && (
      <div class='fade-in' id='background'>  
        <div class='homecontainer basic-font'>
          <img src={PayBuddyLogo}></img>
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
export default Home;
