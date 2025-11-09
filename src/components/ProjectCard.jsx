import React from 'react';

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <img
        src={project.image}
        alt={project.title}
      />

      <div className="project-info">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
          <h3>{project.title}</h3>
          <span style={{fontSize: '12px', color: '#888', marginLeft: '10px'}}>
            {project.category}
          </span>
        </div>

        <p>{project.description}</p>

        {/* project tags */}
        <div className="tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
