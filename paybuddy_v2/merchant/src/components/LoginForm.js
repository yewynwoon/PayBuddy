import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const LoginForm = (props) => (
    <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={props.handleSubmit} className='form_css'>
                <div className='form-item'>
                    <label htmlFor='username'>E-Mail</label>
                    <input className='input' id='username' type='text'/>
                </div>
                <div className='form-item'>
                    <label htmlFor='password'>Password</label>
                    <input className='input' id='password' type='password'/>
                </div>
                <div>
                    <Button id='loginButton' type='submit' variant='primary'>Login</Button>
                </div>
                {props.err ? 'Incorrect E-Mail or Password' : null}
            </form>
        </Modal.Body>
    </Modal>
)

export default LoginForm
