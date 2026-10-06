import React, { useEffect } from 'react';

/**
 * Format ISO date string into readable text
 */
function formatReadableDate(dateStr) {
  if (!dateStr) return 'Not specified';
  try {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export default function TaskDetails({
  isOpen,
  task,
  onClose,
  onEdit,
  onDelete
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const { id, title, description, status, priority, dueDate, createdAt } = task;

  const statusClass = {
    Pending: 'badge-status-pending',
    'In Progress': 'badge-status-progress',
    Completed: 'badge-status-completed'
  }[status] || 'badge-status-pending';

  const priorityClass = {
    Low: 'badge-priority-low',
    Medium: 'badge-priority-medium',
    High: 'badge-priority-high'
  }[priority] || 'badge-priority-low';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container details-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="details-header-badges">
            <span className={`badge ${statusClass}`}>
              <span className="badge-dot" />
              {status}
            </span>
            <span className={`badge ${priorityClass}`}>
              {priority} Priority
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="details-body">
          <h2 className="details-title">{title}</h2>

          <div className="details-section">
            <h4 className="details-section-label">Description</h4>
            <p className="details-description-text">{description}</p>
          </div>

          <div className="details-grid-meta">
            <div className="details-meta-item">
              <span className="details-meta-label">Due Date</span>
              <div className="details-meta-value">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{formatReadableDate(dueDate)}</span>
              </div>
            </div>

            <div className="details-meta-item">
              <span className="details-meta-label">Task Identifier</span>
              <span className="details-meta-code">#{id}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-actions details-actions">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              onClose();
              onDelete(task);
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
            <span>Delete</span>
          </button>

          <div className="details-right-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onEdit(task);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span>Edit Task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
