import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

function Nav() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Wrapping the logo in a Link so clicking it also goes home */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }} className="logo">
          <div className="logo-icon">🌱</div>
          <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>SoilSync</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;