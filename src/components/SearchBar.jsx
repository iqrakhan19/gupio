import React from 'react';

/**
 * SearchBar component provides dynamic text filtering for tasks
 */
export default function SearchBar({ searchTerm, onSearchChange, onClear }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          id="search-input"
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search tasks"
        />

        {searchTerm && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={onClear}
            title="Clear search"
            aria-label="Clear search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
