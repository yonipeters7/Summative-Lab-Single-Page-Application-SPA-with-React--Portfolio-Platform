import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="card group">
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x600?text=Project+Image';
          }}
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-700 text-sm font-medium rounded-full">
            {project.category}
          </span>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
          <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
            {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/5 transition-colors duration-300 pointer-events-none" />
    </div>
  );
};

export default ProjectCard;
