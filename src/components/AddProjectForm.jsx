import React, { useState } from 'react';

function AddProjectForm({ onAddProject, onClose }) {
  // form data state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Design');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // basic validation
    if (!title || !description || !image || !tags) {
      alert('Please fill in all fields');
      return;
    }

    // create new project object
    const newProject = {
      id: Date.now(),
      title: title,
      description: description,
      category: category,
      image: image,
      tags: tags.split(',').map(tag => tag.trim()),
      date: new Date().toISOString().split('T')[0]
    };

    onAddProject(newProject);

    // clear form
    setTitle('');
    setDescription('');
    setCategory('Web Design');
    setImage('');
    setTags('');
  }

  return (
    <div className="form-container">
      <h2>Add New Project</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            placeholder="Describe your project"
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Web Design">Web Design</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Branding">Branding</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="React, UI/UX, Responsive"
          />
        </div>

        <div>
          <button type="submit">Add Project</button>
          <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectForm;
