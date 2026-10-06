import React from 'react';

/**
 * Navbar component for the Task Management Dashboard
 * Displays the application logo, title, and quick "Add Task" trigger
 */
export default function Navbar({ onAddTask, taskCount }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="m9 16 2 2 4-4" />
            </svg>
          </div>
          <div className="brand-text">
            <h1 className="brand-title">TaskFlow</h1>
            <span className="brand-subtitle">Task Management Dashboard</span>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="navbar-badge">
            <span className="badge-count">{taskCount}</span>
            <span className="badge-label">Active Tasks</span>
          </div>
          <button
            id="btn-add-task"
            className="btn btn-primary"
            onClick={onAddTask}
            title="Create a new task"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}
