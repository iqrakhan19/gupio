import React, { useState, useEffect } from 'react';

/**
 * TaskForm component for creating new tasks or editing existing tasks.
 * Performs thorough form validation before submission.
 */
export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isEditing = false
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sync form state when modal opens or when editing data changes
  useEffect(() => {
    if (initialData && isEditing) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'Pending',
        priority: initialData.priority || 'Medium',
        dueDate: initialData.dueDate || ''
      });
    } else {
      // Default blank values for new task
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 3);
      const defaultDate = tomorrow.toISOString().split('T')[0];

      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: defaultDate
      });
    }
    setErrors({});
    setTouched({});
  }, [initialData, isEditing, isOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Validate form fields
  const validate = (dataToValidate = formData) => {
    const errs = {};

    if (!dataToValidate.title || !dataToValidate.title.trim()) {
      errs.title = 'Title is required';
    } else if (dataToValidate.title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters';
    }

    if (!dataToValidate.description || !dataToValidate.description.trim()) {
      errs.description = 'Description is required';
    } else if (dataToValidate.description.trim().length < 5) {
      errs.description = 'Description must be at least 5 characters';
    }

    if (!dataToValidate.status) {
      errs.status = 'Status must be selected';
    }

    if (!dataToValidate.priority) {
      errs.priority = 'Priority must be selected';
    }

    if (!dataToValidate.dueDate) {
      errs.dueDate = 'Due date is required';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    // Live validation if already touched
    if (touched[name]) {
      const fieldErrors = validate(updated);
      setErrors(fieldErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate();
    setErrors(fieldErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      title: true,
      description: true,
      status: true,
      priority: true,
      dueDate: true
    });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Prevent submission if invalid
    }

    // Submit validated payload
    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="modal-subtitle">
              {isEditing
                ? 'Update the fields below to modify your task.'
                : 'Fill in the information below to add a new task to your dashboard.'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="task-form" noValidate>
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="task-form-title" className="form-label">
              Task Title <span className="required-star">*</span>
            </label>
            <input
              id="task-form-title"
              name="title"
              type="text"
              placeholder="e.g. Design System Implementation"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.title && touched.title ? 'input-error' : ''}
              autoFocus
            />
            {errors.title && touched.title && (
              <span className="error-text" role="alert">{errors.title}</span>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="task-form-description" className="form-label">
              Description <span className="required-star">*</span>
            </label>
            <textarea
              id="task-form-description"
              name="description"
              rows="3"
              placeholder="Provide a clear description of the task..."
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.description && touched.description ? 'input-error' : ''}
            />
            {errors.description && touched.description && (
              <span className="error-text" role="alert">{errors.description}</span>
            )}
          </div>

          {/* Status & Priority Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-form-status" className="form-label">
                Status <span className="required-star">*</span>
              </label>
              <select
                id="task-form-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-form-priority" className="form-label">
                Priority <span className="required-star">*</span>
              </label>
              <select
                id="task-form-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Due Date Field */}
          <div className="form-group">
            <label htmlFor="task-form-due-date" className="form-label">
              Due Date <span className="required-star">*</span>
            </label>
            <input
              id="task-form-due-date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.dueDate && touched.dueDate ? 'input-error' : ''}
            />
            {errors.dueDate && touched.dueDate && (
              <span className="error-text" role="alert">{errors.dueDate}</span>
            )}
          </div>

          {/* Form Action Buttons */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="btn-submit-task"
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
