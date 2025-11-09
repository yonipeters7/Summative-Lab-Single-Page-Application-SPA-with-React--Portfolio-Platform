# Component Tree Documentation

## Overview
This document outlines the component hierarchy and state management architecture for the Creative Agency Portfolio Platform.

## Component Tree Structure

```
App (Root Component)
│
├── Header
│   └── Navigation Links
│
├── Hero
│   └── Add Project Button
│
├── Main Content
│   │
│   ├── AddProjectForm (Conditional)
│   │   ├── Form Inputs
│   │   │   ├── Title Input
│   │   │   ├── Description Textarea
│   │   │   ├── Category Select
│   │   │   ├── Date Input
│   │   │   ├── Image URL Input
│   │   │   └── Tags Input
│   │   └── Form Actions
│   │       ├── Cancel Button
│   │       └── Submit Button
│   │
│   ├── SearchBar
│   │   ├── Search Input
│   │   └── Category Filter Dropdown
│   │
│   └── ProjectList
│       └── ProjectCard (Multiple)
│           ├── Project Image
│           ├── Category Badge
│           ├── Project Title
│           ├── Project Date
│           ├── Project Description
│           └── Tags (Multiple)
│
└── Footer
```

## State Management

### App Component (Parent State)

The `App` component manages all application state and passes data down to child components via props.

**State Variables:**

1. **`projects`** (Array)
   - **Type**: `useState(initialProjects)`
   - **Purpose**: Stores all project data
   - **Initial Value**: Loaded from `utils/initialProjects.js`
   - **Used By**: App component for filtering and passing to ProjectList

2. **`searchTerm`** (String)
   - **Type**: `useState('')`
   - **Purpose**: Stores the current search query
   - **Used By**: SearchBar (controlled input) and App (filtering logic)

3. **`selectedCategory`** (String)
   - **Type**: `useState('All')`
   - **Purpose**: Stores the currently selected category filter
   - **Used By**: SearchBar (controlled select) and App (filtering logic)

4. **`showAddForm`** (Boolean)
   - **Type**: `useState(false)`
   - **Purpose**: Controls visibility of the AddProjectForm
   - **Used By**: App component for conditional rendering

**Computed Values (useMemo):**

1. **`categories`**
   - **Dependency**: `projects`
   - **Purpose**: Extracts unique categories from all projects
   - **Passed To**: SearchBar component

2. **`filteredProjects`**
   - **Dependencies**: `projects`, `searchTerm`, `selectedCategory`
   - **Purpose**: Filters projects based on search and category
   - **Logic**:
     - Searches in title, description, and tags
     - Filters by selected category

3. **`sortedProjects`**
   - **Dependency**: `filteredProjects`
   - **Purpose**: Sorts filtered projects by date (newest first)
   - **Passed To**: ProjectList component

## Props Flow

### Header Component
```javascript
Props: None
Description: Presentational component with static navigation
```

### Hero Component
```javascript
Props: {
  onAddProjectClick: Function
}
Description: Displays hero section with call-to-action button
```

### SearchBar Component
```javascript
Props: {
  searchTerm: String,
  onSearchChange: Function,
  categories: Array<String>,
  selectedCategory: String,
  onCategoryChange: Function
}
Description: Controlled component for search and filter functionality
```

### AddProjectForm Component
```javascript
Props: {
  onAddProject: Function,
  onClose: Function
}
Local State: {
  formData: Object (title, description, category, image, tags, date),
  errors: Object
}
Description: Form component with local state for input management and validation
```

### ProjectList Component
```javascript
Props: {
  projects: Array<Project>
}
Description: Renders grid of project cards or empty state
```

### ProjectCard Component
```javascript
Props: {
  project: Object {
    id: Number,
    title: String,
    description: String,
    category: String,
    image: String,
    tags: Array<String>,
    date: String
  }
}
Description: Presentational component displaying individual project details
```

## Data Flow Patterns

### Top-Down Data Flow
- State is managed at the highest common ancestor (App component)
- Data flows down through props
- No prop drilling beyond two levels

### Event Flow (Bottom-Up)
- Child components receive callback functions as props
- Events are handled by updating state in the parent component
- State changes trigger re-renders down the tree

### Example Flow: Adding a New Project

1. User clicks "Add New Project" button in Hero component
2. Hero calls `onAddProjectClick()` → App sets `showAddForm` to `true`
3. AddProjectForm renders with local state for form inputs
4. User fills form and submits
5. AddProjectForm calls `onAddProject(newProject)` → App updates `projects` state
6. Projects state change triggers:
   - `categories` recalculation (if new category)
   - `filteredProjects` recalculation
   - `sortedProjects` recalculation
7. ProjectList receives updated `sortedProjects` and re-renders
8. New ProjectCard appears in the grid

### Example Flow: Searching Projects

1. User types in search input in SearchBar component
2. SearchBar calls `onSearchChange(value)` → App updates `searchTerm` state
3. `searchTerm` change triggers `filteredProjects` recalculation
4. `filteredProjects` change triggers `sortedProjects` recalculation
5. ProjectList receives updated `sortedProjects` and re-renders
6. Only matching projects are displayed

## State Lifting Strategy

State is "lifted" to the App component because:

1. **Search functionality** needs access to all projects
2. **Category filtering** needs access to all projects
3. **Adding projects** updates the shared project list
4. Multiple components need to read/modify the same data

Local state is used in AddProjectForm for:
- Form input values (not needed by other components)
- Validation errors (specific to form context)

## Performance Optimizations

1. **useMemo for expensive computations**
   - Prevents unnecessary re-filtering and re-sorting
   - Only recalculates when dependencies change

2. **Conditional Rendering**
   - AddProjectForm only renders when needed
   - Reduces initial render complexity

3. **Component Separation**
   - Each component has a single responsibility
   - Easy to optimize individual components if needed

## Future Enhancements

Potential improvements to consider:

1. **Context API**: If component tree grows deeper, use Context to avoid prop drilling
2. **useReducer**: For complex state updates, replace multiple useState with useReducer
3. **Local Storage**: Persist projects between sessions
4. **Pagination**: For large project lists
5. **Lazy Loading**: Load project images on demand
6. **Error Boundaries**: Add error handling for component failures
