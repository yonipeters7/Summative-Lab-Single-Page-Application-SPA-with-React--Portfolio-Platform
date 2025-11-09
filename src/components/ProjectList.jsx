import React from 'react';
import ProjectCard from './ProjectCard';

function ProjectList({ projects }) {
  // show message if no projects
  if (projects.length === 0) {
    return (
      <div style={{textAlign: 'center', padding: '40px'}}>
        <h3>No projects found</h3>
        <p>Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{marginBottom: '20px', paddingLeft: '20px'}}>
        Projects ({projects.length})
      </h2>

      <div className="projects-container">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
