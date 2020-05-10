import {useOktaAuth} from '@okta/okta-react';

import React, { useDebugValue } from 'react';
import './Header.css';
import Logo from './img/logoandtext.png';
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
                        src={Logo} 
                        alt="paybuddy-logo" 
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