import React, { useEffect } from 'react';

/**
 * ConfirmDialog component for safe deletion workflow
 */
export default function ConfirmDialog({
  isOpen,
  title = 'Delete Task',
  message = 'Are you sure you want to delete this task? This action cannot be undone.',
  taskTitle = '',
  onConfirm,
  onCancel
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-container confirm-container" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <div className="confirm-body">
          <h3 className="confirm-title">{title}</h3>
          <p className="confirm-message">{message}</p>
          {taskTitle && (
            <div className="confirm-target">
              <strong>"{taskTitle}"</strong>
            </div>
          )}
        </div>

        <div className="modal-actions confirm-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            id="btn-cancel-delete"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            id="btn-confirm-delete"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
