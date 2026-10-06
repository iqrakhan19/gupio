import React from 'react';

/**
 * FilterBar component allows switching status filter tabs and priority filters
 */
export default function FilterBar({
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  sortBy,
  onSortChange,
  taskCounts
}) {
  const statusOptions = [
    { label: 'All', value: 'All', count: taskCounts.total },
    { label: 'Pending', value: 'Pending', count: taskCounts.pending },
    { label: 'In Progress', value: 'In Progress', count: taskCounts.inProgress },
    { label: 'Completed', value: 'Completed', count: taskCounts.completed }
  ];

  return (
    <div className="filter-bar">
      {/* Status Segmented Buttons */}
      <div className="filter-status-group" role="tablist" aria-label="Status filters">
        {statusOptions.map((opt) => {
          const isActive = selectedStatus === opt.value;
          return (
            <button
              key={opt.value}
              id={`filter-${opt.value.toLowerCase().replace(/\s+/g, '-')}`}
              role="tab"
              aria-selected={isActive}
              className={`filter-tab ${isActive ? 'filter-tab-active' : ''}`}
              onClick={() => onStatusChange(opt.value)}
            >
              <span>{opt.label}</span>
              <span className="filter-pill-count">{opt.count}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls: Priority & Sort */}
      <div className="filter-secondary-group">
        <div className="filter-select-wrapper">
          <label htmlFor="priority-filter" className="sr-only">Filter by Priority</label>
          <select
            id="priority-filter"
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            aria-label="Filter by Priority"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        <div className="filter-select-wrapper">
          <label htmlFor="sort-select" className="sr-only">Sort Tasks</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort Tasks"
          >
            <option value="dueDate-asc">Due Date (Earliest)</option>
            <option value="dueDate-desc">Due Date (Latest)</option>
            <option value="priority-desc">Priority (High to Low)</option>
            <option value="title-asc">Title (A to Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
