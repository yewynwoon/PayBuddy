import React from "react";
import { useLocation } from 'react-router-dom'
import {useOktaAuth} from '@okta/okta-react';
import './client.css'
import { Menu }  from 'semantic-ui-react'

const NavigationBar = () => {
const { authState } = useOktaAuth();
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
      {authState.isAuthenticated && (
      <Menu.Item as ="a" header href='/AddFriend'>
        <ActiveAddFriend />
      </Menu.Item>
      )}
    </div>
  );
}

function AddFriend() {
  return (
    <div>
      <AddFriend/>
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
  if (GetLocation() === '/Dashboard') {
    return (
      <a href="!#" id="activeNav">HOME</a>
    )
  } else {
    return (
      <a href="!#">HOME</a>
    )
  }
}

function ActiveFunds() {
  if (GetLocation() === '/FundsDeposit') {
    return (
      <a href="!#" id="activeNav">DEPOSIT FUNDS</a>
    )
  } else {
    return (
      <a href="!#">DEPOSIT FUNDS</a>
    )
  }
}

function ActiveTransfer() {
  if (GetLocation() === '/UserTransfer') {
    return (
      <a href="!#" id="activeNav">TRANSFER</a>
    )
  } else {
    return (
      <a href="!#">TRANSFER</a>
    )
  }
}

function ActivePayBill() {
  if (GetLocation() === '/PayBill') {
    return (
      <a href="!#" id="activeNav">PAY BILL</a>
    )
  } else {
    return (
      <a href="!#">PAY BILL</a>
    )
  }
}

function ActiveAddFriend() {
  if (GetLocation() === '/AddFriend') {
    return (
      <a href="!#" id="activeNav">ADD FRIEND</a>
    )
  } else {
    return (
      <a href="!#">ADD FRIEND</a>
    )
  }
}

export default NavigationBar;