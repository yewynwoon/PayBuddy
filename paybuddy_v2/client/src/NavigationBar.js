import React from "react";
import { useLocation } from 'react-router-dom'
import {useOktaAuth} from '@okta/okta-react';
import './client.css'
import { Menu }  from 'semantic-ui-react'

const NavigationBar = () => {
const {authState, authService} = useOktaAuth();
  return (
    <div class='topnav'>
      {authState.isAuthenticated && (
      <Menu.Item as ="a" header href="/Dashboard">
        <ActiveHome />
      </Menu.Item>
      )}
      {authState.isAuthenticated && (
      <Menu.Item as ="a" header href="/FundsDeposit">
        <ActiveFunds />
      </Menu.Item>
      )}
      {authState.isAuthenticated && (
      <Menu.Item as ="a" header href="/UserTransfer">
        <ActiveTransfer />
      </Menu.Item>
      )}
      {authState.isAuthenticated && (
      <Menu.Item as ="a" header href="/PayBill">
        <ActivePayBill />
      </Menu.Item>
      )}
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

function ActiveTransfer() {
  if (GetLocation() == '/UserTransfer') {
    return (
      <a id="activeNav">TRANSFER</a>
    )
  } else {
    return (
      <a>TRANSFER</a>
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