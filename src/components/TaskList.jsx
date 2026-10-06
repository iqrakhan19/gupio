import React from 'react';
import TaskCard from './TaskCard';

/**
 * TaskList component handles grid layout and empty states
 */
export default function TaskList({
  tasks,
  totalTasksCount,
  searchTerm,
  selectedStatus,
  selectedPriority,
  onResetFilters,
  onAddTask,
  onView,
  onEdit,
  onDelete,
  onStatusChange
}) {
  // Scenario 1: User has zero tasks in total
  if (totalTasksCount === 0) {
    return (
      <div className="empty-state" id="empty-state-no-tasks">
        <div className="empty-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        </div>
        <h3 className="empty-title">No tasks created yet</h3>
        <p className="empty-description">
          Organize your workflow! Click the button below to add your very first task to the dashboard.
        </p>
        <button
          id="btn-empty-add"
          className="btn btn-primary"
          onClick={onAddTask}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Create First Task</span>
        </button>
      </div>
    );
  }

  // Scenario 2: Tasks exist, but none match current search or filters
  if (tasks.length === 0) {
    return (
      <div className="empty-state" id="empty-state-no-matches">
        <div className="empty-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3 className="empty-title">No matching tasks found</h3>
        <p className="empty-description">
          We couldn't find any tasks matching your criteria
          {searchTerm ? ` for "${searchTerm}"` : ''}
          {selectedStatus !== 'All' ? ` with status "${selectedStatus}"` : ''}
          {selectedPriority !== 'All' ? ` and priority "${selectedPriority}"` : ''}.
        </p>
        <button
          id="btn-clear-filters"
          className="btn btn-secondary"
          onClick={onResetFilters}
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  // Scenario 3: Display matching tasks in a responsive grid
  return (
    <div className="tasks-grid" id="tasks-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
