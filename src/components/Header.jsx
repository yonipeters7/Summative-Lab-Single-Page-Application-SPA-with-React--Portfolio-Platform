import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CA</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Creative Agency</h1>
              <p className="text-sm text-gray-600">Portfolio Showcase</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#projects" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Projects
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
