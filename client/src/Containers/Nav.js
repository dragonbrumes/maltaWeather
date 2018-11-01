import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <header className="header">
        <h1>
          <Link to="/">Weather in Malta</Link>
        </h1>
      </header>
    );
  }
}

export default Nav;
