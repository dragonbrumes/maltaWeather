import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <header className="header">
                <h1>Weather in Malta</h1>
                {/* <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/articles'>articles</Link></li>
                        <li><Link to='/weather'>Weather</Link></li>
                    </ul>
                </nav> */}
            </header>
        );
    }
}

export default Nav;
