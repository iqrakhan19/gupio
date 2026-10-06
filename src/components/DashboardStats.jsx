import React from 'react';

/**
 * DashboardStats component calculates and displays high-level task metrics
 * - Total Tasks
 * - Pending Tasks
 * - In Progress Tasks
 * - Completed Tasks
 * - Completion Progress Percentage
 */
export default function DashboardStats({ tasks, activeFilter, onSelectFilter }) {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const statCards = [
    {
      id: 'stat-total',
      label: 'Total Tasks',
      value: total,
      filterValue: 'All',
      colorClass: 'stat-total',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
      subtext: `${completionRate}% Completed`
    },
    {
      id: 'stat-pending',
      label: 'Pending Tasks',
      value: pending,
      filterValue: 'Pending',
      colorClass: 'stat-pending',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      subtext: 'Awaiting action'
    },
    {
      id: 'stat-in-progress',
      label: 'In Progress',
      value: inProgress,
      filterValue: 'In Progress',
      colorClass: 'stat-progress',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
      subtext: 'Currently active'
    },
    {
      id: 'stat-completed',
      label: 'Completed Tasks',
      value: completed,
      filterValue: 'Completed',
      colorClass: 'stat-completed',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      subtext: 'Fully finished'
    }
  ];

  return (
    <section className="dashboard-stats" aria-label="Task Statistics">
      <div className="stats-grid">
        {statCards.map((stat) => {
          const isSelected = activeFilter === stat.filterValue;
          return (
            <div
              key={stat.id}
              id={stat.id}
              className={`stat-card ${stat.colorClass} ${isSelected ? 'stat-card-active' : ''}`}
              onClick={() => onSelectFilter && onSelectFilter(stat.filterValue)}
              title={`Click to filter by ${stat.label}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectFilter && onSelectFilter(stat.filterValue);
                }
              }}
            >
              <div className="stat-card-header">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-icon-wrapper">{stat.icon}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-footer">
                <span className="stat-subtext">{stat.subtext}</span>
                {isSelected && <span className="stat-active-indicator">Filtering</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Completion Progress Bar */}
      <div className="completion-bar-container">
        <div className="completion-bar-label">
          <span>Overall Project Progress</span>
          <span className="completion-percentage">{completionRate}%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
            aria-valuenow={completionRate}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
    </section>
  );
}
