import React from 'react'
import {useOktaAuth} from '@okta/okta-react'
import { Menu }  from 'semantic-ui-react'
import Logo from './img/logoandtext.png'
import './Header.css'

const Header = () => {
    const {authState, authService} = useOktaAuth();
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