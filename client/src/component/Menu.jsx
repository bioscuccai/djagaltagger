import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div className="row">
        <Link to="/">Images</Link>
        &nbsp;|&nbsp;
        <Link to="/upload">Upload</Link>
        &nbsp;|&nbsp;
        <Link to="/differences">Differences</Link>
      </div>
    )
  }
}

export default Menu;
