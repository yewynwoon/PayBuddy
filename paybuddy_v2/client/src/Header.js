import React from 'react';
import './course.css';
import Logo from './img/paybuddy_text.png';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div>
                <header class='header'>
                    <h1><a href="/Dashboard" ><img class='home-image' src={Logo} alt="paybuddy-logo" width="205" height="56"/></a></h1>
                </header>
            </div>
        )
    }
}

export default Header;