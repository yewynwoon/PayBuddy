import React from 'react';
import './course.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div>
                <footer class='footer'>
		            <p  class='footerText'>&copy; 2020 PP1 Group15</p>
	            </footer>
            </div>
        )
    }
}

export default Header;