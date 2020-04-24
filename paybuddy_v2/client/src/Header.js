import {useOktaAuth} from '@okta/okta-react';

import React, { useDebugValue } from 'react';
import './client.css';
import Logo from './img/paybuddyicon.png';
import LoginPage from './Login';
import { Menu }  from 'semantic-ui-react'

const Header = () => {
    const {authState, authService} = useOktaAuth();
    const login = async () => authService.login('/');
    const logout = async () => authService.logout('/');

    
    return (
        <header>
                <a href="/Dashboard" >
                    <img 
                        id='homeimage' 
                        src={Logo} 
                        alt="paybuddy-logo" 
                        height="70" 
                        width="auto"
                    />
                </a>
                {authState.isAuthenticated && (
                    <span class='header-log-out' id='log-out-link'>
                        <Menu.Item as="a" onClick={logout}>
                            Logout      
                        </Menu.Item>
                    </span>
                    )}
        </header>
    );
}

export default Header;