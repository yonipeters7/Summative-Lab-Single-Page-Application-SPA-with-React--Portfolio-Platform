import React from 'react';

function Header() {
  return (
    <header className="header">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto'}}>
        <div>
          <h1>Creative Agency</h1>
          <p style={{fontSize: '14px', color: '#666'}}>Portfolio Showcase</p>
        </div>

        <nav style={{display: 'flex', gap: '25px'}}>
          <a href="#projects" style={{color: '#333', textDecoration: 'none'}}>Projects</a>
          <a href="#about" style={{color: '#333', textDecoration: 'none'}}>About</a>
          <a href="#contact" style={{color: '#333', textDecoration: 'none'}}>Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
