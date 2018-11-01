import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-links">
          <Link to="/article/5b93ae34b233f03b20007368">Malta in short</Link>
          <Link to="/article/5b910810959c452c487d0061">Malta climat</Link>
        </div>
      </div>
    );
  }
}

export default Footer;
