import React from 'react';
import './Navbar.css';

const Navbar = ({ title, onButtonClick, darkMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-title">{title}</div>
      <button className="navbar-button" onClick={onButtonClick}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;
