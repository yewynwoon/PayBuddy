import React, { useState } from 'react'
import Logo from '../imgs/logoandtext.png'
import LoginForm from '../components/LoginForm'
import '../css/unAuthApp.css'

function UnauthenticatedApp(props) {

  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);

  const handleShow = () => setShow(true);

  function closeForm() {
    setShow(false);
    setErr(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const {username, password} = event.target.elements;

    fetch('http://localhost:9000/merchant/login', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        uname: username.value,
        pword: password.value
      })
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        setErr(true);
      }
    })
    .then((response) => {
      props.auth.handleAuthentication(response)
    })
  }

  return (
    <div class='content-pane'>
      <img src={Logo} class='logo-image space-3' alt="paybuddy-logo"/>
      <h1 class='heading'>Merchant Portal</h1>
      <div>
        <button type='button' class='orange-button space-3' onClick={handleShow}>Login</button>
        <LoginForm show={show} close={closeForm} handleSubmit={handleSubmit} err={err} />
      </div>
    </div>
  )
}

export default UnauthenticatedApp
