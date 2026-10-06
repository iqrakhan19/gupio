import React from 'react';

/**
 * Helper to format date strings into human-friendly format
 */
function formatDate(dateStr) {
  if (!dateStr) return 'No date';
  try {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

/**
 * Check if a task is overdue (past due date and not completed)
 */
function isOverdue(dueDate, status) {
  if (!dueDate || status === 'Completed') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  return due < today;
}

export default function TaskCard({
  task,
  onView,
  onEdit,
  onDelete,
  onStatusChange
}) {
  const { id, title, description, status, priority, dueDate } = task;
  const overdue = isOverdue(dueDate, status);

  // Status class mapping
  const statusClass = {
    Pending: 'badge-status-pending',
    'In Progress': 'badge-status-progress',
    Completed: 'badge-status-completed'
  }[status] || 'badge-status-pending';

  // Priority class mapping
  const priorityClass = {
    Low: 'badge-priority-low',
    Medium: 'badge-priority-medium',
    High: 'badge-priority-high'
  }[priority] || 'badge-priority-low';

  return (
    <article className={`task-card ${status === 'Completed' ? 'task-card-completed' : ''}`} id={`task-${id}`}>
      {/* Card Header: Badges & Quick Status */}
      <div className="task-card-meta">
        <div className="task-badges">
          <span className={`badge ${statusClass}`}>
            <span className="badge-dot" />
            {status}
          </span>
          <span className={`badge ${priorityClass}`}>
            {priority} Priority
          </span>
          {overdue && (
            <span className="badge badge-overdue" title="Due date has passed">
              Overdue
            </span>
          )}
        </div>

        {/* Quick status cycle button */}
        <div className="task-quick-status">
          <select
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
            className="quick-status-select"
            title="Change status"
            aria-label={`Change status for task ${title}`}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="task-title" onClick={() => onView(task)} title="Click to view details">
        {title}
      </h3>
      <p className="task-description">
        {description}
      </p>

      {/* Due Date Indicator */}
      <div className={`task-due-date ${overdue ? 'date-overdue' : ''}`}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>Due {formatDate(dueDate)}</span>
      </div>

      {/* Card Actions: View, Edit, Delete */}
      <div className="task-actions">
        <button
          type="button"
          className="btn-action btn-action-view"
          onClick={() => onView(task)}
          title="View full task details"
          id={`btn-view-${id}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>View</span>
        </button>

        <button
          type="button"
          className="btn-action btn-action-edit"
          onClick={() => onEdit(task)}
          title="Edit this task"
          id={`btn-edit-${id}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Edit</span>
        </button>

        <button
          type="button"
          className="btn-action btn-action-delete"
          onClick={() => onDelete(task)}
          title="Delete this task"
          id={`btn-delete-${id}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}
