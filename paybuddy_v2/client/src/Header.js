import React, { useDebugValue } from 'react';
import './client.css';
import Logo from './img/paybuddyicon.png';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
                <header>
                        <a href="/Dashboard" ><img id='homeimage' src={Logo} alt="paybuddy-logo" height="70" width="auto"/></a>
                </header>
        );
    }
}

export default Header;