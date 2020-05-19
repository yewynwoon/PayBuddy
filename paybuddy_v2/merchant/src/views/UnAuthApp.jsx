import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
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
    <div className='content_pane'>
      <img src={Logo} className='logo-image' alt="paybuddy-logo"/>
      <h1 className='heading'>PayBuddy Merchant Portal</h1>
      <div>
        <Button id='loginButton' variant="primary" onClick={handleShow}>Login</Button>
        <LoginForm show={show} close={closeForm} handleSubmit={handleSubmit} err={err} />
      </div>
    </div>
  )
}

export default UnauthenticatedApp
