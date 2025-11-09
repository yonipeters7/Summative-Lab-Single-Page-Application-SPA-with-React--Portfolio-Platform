import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/AddProjectForm';
import { initialProjects } from './utils/initialProjects';

function App() {
  // state for all the projects
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // get categories from projects array
  function getCategories() {
    let cats = [];
    for (let i = 0; i < projects.length; i++) {
      if (!cats.includes(projects[i].category)) {
        cats.push(projects[i].category);
      }
    }
    return cats.sort();
  }

  // filter the projects based on search and category
  function filterProjects() {
    let filtered = [];

    for (let i = 0; i < projects.length; i++) {
      let project = projects[i];
      let matchesSearch = false;

      // check if search term matches title or description
      if (project.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        matchesSearch = true;
      }
      if (project.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        matchesSearch = true;
      }

      // also check tags
      for (let j = 0; j < project.tags.length; j++) {
        if (project.tags[j].toLowerCase().includes(searchTerm.toLowerCase())) {
          matchesSearch = true;
        }
      }

      // if no search term, show all
      if (searchTerm === '') {
        matchesSearch = true;
      }

      // check category filter
      let matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;

      if (matchesSearch && matchesCategory) {
        filtered.push(project);
      }
    }

    return filtered;
  }

  // add new project to the list
  function handleAddProject(newProject) {
    setProjects([newProject, ...projects]);
    setShowAddForm(false);
  }

  const categories = getCategories();
  const filteredProjects = filterProjects();

  return (
    <div>
      <Header />

      <Hero onAddProjectClick={() => setShowAddForm(true)} />

      <main>
        {showAddForm && (
          <AddProjectForm
            onAddProject={handleAddProject}
            onClose={() => setShowAddForm(false)}
          />
        )}

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <ProjectList projects={filteredProjects} />
      </main>

      <footer style={{backgroundColor: 'white', padding: '20px', textAlign: 'center', marginTop: '40px'}}>
        <p>Portfolio Platform - Built with React</p>
      </footer>
    </div>
  );
}

export default App;
