import React from 'react'
import Modal from 'react-bootstrap/Modal'
import '../css/LoginForm.css'

const LoginForm = (props) => (
    <Modal show={props.show} onHide={props.close}>
        <div class='login-container'>
            <header class='login-header space-3' closeButton>
                Login
            </header>
            <body>
                <form onSubmit={props.handleSubmit}>
                    <div class='form-line'>
                        <label htmlFor='username'>E-Mail</label>
                        <input className='input' id='username' type='text'/>
                    </div>
                    <div class='form-line'>
                        <label htmlFor='password'>Password</label>
                        <input className='input' id='password' type='password'/>
                    </div>
                    <div class='center-align'>
                        <button class='orange-button space-3' type='submit' variant='primary'>Login</button>
                    </div>
                    {props.err ? 'Incorrect E-Mail or Password' : null}
                </form>
            </body>
        </div>
    </Modal>
)

export default LoginForm
