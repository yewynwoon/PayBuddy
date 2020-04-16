import React from 'react';
import './client.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div>
                <footer class='footer'>
		            <p  class='footerText'>&copy; 2020 PP1 Group 15</p>
	            </footer>
            </div>
        )
    }
}

export default Header;