import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

class Navbar extends Component {
    render() {
        return (
            <div class='nav-container'>
                <ul>
                            <li class='navbar-link'>
                                <Link to="/">
                                    My Apps
                                </Link>
                            </li>
                            <li class='navbar-link'>
                                <Link to="/dash">
                                    My Account
                                </Link>
                            </li>
                        {/* <div className="nav-link">
                            Sandbox
                        </div>
                        <li className="nav-item">
                            <div className="nav-link">
                                <Link to="/">
                                    Accounts
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link">
                                <Link to="/">
                                    Notifications
                                </Link>
                            </div>
                        </li> */}
                </ul>
            </div>
        )
    }
}

export default Navbar;
