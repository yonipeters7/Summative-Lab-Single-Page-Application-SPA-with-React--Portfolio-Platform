import { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/AddProjectForm';
import { initialProjects } from './utils/initialProjects';

function App() {
  // State Management
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Get unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map(p => p.category))];
    return uniqueCategories.sort();
  }, [projects]);

  // Filter projects based on search term and category
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  // Sort projects by date (newest first)
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [filteredProjects]);

  // Handler to add a new project
  const handleAddProject = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
    setShowAddForm(false);

    // Show a success message (you could add a toast notification here)
    console.log('Project added successfully:', newProject);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Hero onAddProjectClick={() => setShowAddForm(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Add Project Form (conditionally rendered) */}
        {showAddForm && (
          <div className="mb-8">
            <AddProjectForm
              onAddProject={handleAddProject}
              onClose={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Search and Filter Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Project List */}
        <ProjectList projects={sortedProjects} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Creative Agency Portfolio Platform</p>
            <p className="text-sm">Built with React, Vite, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
