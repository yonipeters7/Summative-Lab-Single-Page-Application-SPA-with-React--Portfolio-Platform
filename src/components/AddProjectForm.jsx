import React, { useState } from 'react';

const AddProjectForm = ({ onAddProject, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Design',
    image: '',
    tags: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!formData.image.match(/^https?:\/\/.+/)) {
      newErrors.image = 'Please enter a valid URL';
    }

    if (!formData.tags.trim()) {
      newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newProject = {
      id: Date.now(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      image: formData.image.trim(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      date: formData.date
    };

    onAddProject(newProject);

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'Web Design',
      image: '',
      tags: '',
      date: new Date().toISOString().split('T')[0]
    });
    setErrors({});

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Project</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close form"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter project title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Describe your project"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Web Design">Web Design</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Branding">Branding</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Project Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL *
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`input-field ${errors.image ? 'border-red-500' : ''}`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Tip: Use Unsplash.com for free project images
            </p>
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated) *
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={`input-field ${errors.tags ? 'border-red-500' : ''}`}
              placeholder="React, UI/UX, Responsive"
            />
            {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn-primary"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;
