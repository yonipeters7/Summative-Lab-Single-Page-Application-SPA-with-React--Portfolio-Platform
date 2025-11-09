import React from 'react';

const Hero = ({ onAddProjectClick }) => {
  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Showcasing Creative Excellence
          </h2>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Explore our portfolio of innovative projects and inspiring design work
          </p>
          <button
            onClick={onAddProjectClick}
            className="inline-flex items-center px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
