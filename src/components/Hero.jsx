import React from 'react';

function Hero({ onAddProjectClick }) {
  return (
    <div className="hero">
      <h2>Showcasing Creative Excellence</h2>
      <p>Explore our portfolio of innovative projects and inspiring design work</p>
      <button onClick={onAddProjectClick}>
        Add New Project
      </button>
    </div>
  );
}

export default Hero;
