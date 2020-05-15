import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
    render() {
        return (
            <div className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <div className="nav-link">
                            Dashboard
                        </div>
                        <li className="nav-item">
                            <div className="nav-link">
                                <Link to="/">
                                    My Apps
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link">
                                <Link to="/">
                                    My Account
                                </Link>
                            </div>
                        </li>
                        <div className="nav-link">
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
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;
