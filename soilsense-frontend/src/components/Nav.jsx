import React from 'react';
import '../styles/Nav.css';

function Nav() {
  const scrollToAnalysis = () => {
    const element = document.getElementById('analysis-tool');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <div className="logo-icon">🌱</div>
          <span>SoilSense</span>
        </div>
        
        <div className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#history">History</a>
          <a href="#reports">Reports</a>
          <a href="#about">About</a>
        </div>
        
        <button className="nav-btn" onClick={scrollToAnalysis}>
          + New Test
        </button>
      </div>
    </nav>
  );
}

export default Nav;