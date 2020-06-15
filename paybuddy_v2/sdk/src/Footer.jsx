import React from 'react';
import './client.css';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <footer>
                <p class='footerText'>&copy; 2020 PP1 Group 15</p>
            </footer>
        )
    }
}

export default Footer;