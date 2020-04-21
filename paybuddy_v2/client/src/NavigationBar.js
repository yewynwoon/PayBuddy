import React from "react";
import { useLocation } from 'react-router-dom'
import {useOktaAuth} from '@okta/okta-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DashboardComp from './Dashboard';
import FundsDepositComp from './FundsDeposit';
import PayBillComp from './PayBill';
import LoginPage from './Login';
import { Container, Icon, Image , Menu} from 'semantic-ui-react';


// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.


const NavigationBar = () => {
const {authState, authService} = useOktaAuth();
const login = async () => authService.login('/');
const logout = async () => authService.logout('/');

  return (
    <div>
      {authState.isAuthenticated && (
      <Menu.Item as ="a" header href="/Dashboard">
      Home
      </Menu.Item>
      )}
      {authState.isAuthenticated && (
      <Menu.Item as ="a" header href="/FundsDeposit">
      Deposit Funds
      </Menu.Item>
      )}
      {authState.isAuthenticated && (
      <Menu.Item as ="a" header href="/PayBill">
      Pay Bills
      </Menu.Item>
      )}
      {authState.isAuthenticated && (
      <Menu.Item as ="a" onClick={logout}>
      Logout      
      </Menu.Item>
      )}
      {!authState.isPending && !authState.isAuthenticated && (<Menu.Item as="a" onClick={login}>
      Login
      </Menu.Item>
      )}
      
    </div>
  );
}

// You can think of these components as "pages"
// in your app.

function Index() {
  return (
    <div>
      <DashboardComp user_id='1'/>
    </div>
  );
}

function FundsDeposit() {
  return (
    <div>
      <FundsDepositComp/>
    </div>
  );
}

function PayBill() {
  return (
    <div>
      <PayBillComp/>
    </div>
  );
}

function Login() {
  return (
    <div>
      <LoginPage/>
    </div>
  );
}

function GetLocation() {
  let location = useLocation();
  console.log(location.pathname);
  return (
    location.pathname
  );
}

function ActiveHome() {
  if (GetLocation() == '/Dashboard') {
    return (
      <a id="activeNav">HOME</a>
    )
  } else {
    return (
      <a>HOME</a>
    )
  }
}

function ActiveFunds() {
  if (GetLocation() == '/FundsDeposit') {
    return (
      <a id="activeNav">DEPOSIT FUNDS</a>
    )
  } else {
    return (
      <a>DEPOSIT FUNDS</a>
    )
  }
}

function ActivePayBill() {
  if (GetLocation() == '/PayBill') {
    return (
      <a id="activeNav">PAY BILL</a>
    )
  } else {
    return (
      <a>PAY BILL</a>
    )
  }
}
export default NavigationBar;