import {useOktaAuth} from '@okta/okta-react';

import React from 'react';
import './client.css';
import Logo from './img/icon.png';
import { Menu }  from 'semantic-ui-react'

const Header = () => {
    const {authState, authService} = useOktaAuth();
    const logout = async () => authService.logout('/');

    return (
        <header>
            <img 
                id='homeimage' 
                src={Logo} 
                alt="paybuddy-logo"
                width="70px"
                height="auto" 
            />
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