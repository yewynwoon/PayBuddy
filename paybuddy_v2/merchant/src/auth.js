import history from './history';

export default class Auth {

  handleAuthentication = (response) => {
    this.setSession(response);
    history.replace('/');
  }

  setSession = (body) => {
    // Set the time that the access token will expire at
  console.log(body);

    let expiresAt = JSON.stringify((64000) + new Date().getTime());
    localStorage.setItem('id_token', body.response.merchant_id);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
  }  

  // removes user details from localStorage
  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  // checks if the user is authenticated
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getUserID = () => {
    return localStorage.getItem('id_token');
  }
}