import React, { Component } from 'react'
import '../css/Header.css'

class Header extends Component {

    render() {
        return (
            <div class='header-container'>
                <a class='header-header' href="/">{process.env.REACT_APP_NAME}</a>
                {this.props.items.map((item, index) => (
                        <span class='log-out' key={index}>
                            <a href={item.link} onClick={item.onClick}>
                                {item.title}
                            </a>
                        </span>
                    ))}
            </div>
        )
    }
}

export default Header
