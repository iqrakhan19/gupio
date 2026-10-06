import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';
import { INITIAL_TASKS } from './data/initialTasks';
import './App.css';

const STORAGE_KEY = 'taskflow_tasks';

export default function App() {
  // 1. Initialize tasks from localStorage or initial mock data
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse tasks from localStorage', e);
    }
    return INITIAL_TASKS;
  });

  // 2. Search & Filtering State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate-asc');

  // 3. Modal / Dialog States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // 4. Toast Feedback State
  const [toast, setToast] = useState(null);

  // 5. Synchronize tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Could not save to localStorage', e);
    }
  }, [tasks]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // --- Task CRUD Operations ---

  // Create Task
  const handleCreateTask = (formData) => {
    const newTask = {
      ...formData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    setTasks((prev) => [newTask, ...prev]);
    setIsCreateOpen(false);
    showToast(`Task "${newTask.title}" created successfully!`, 'success');
  };

  // Edit / Update Task
  const handleUpdateTask = (formData) => {
    if (!editingTask) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTask.id
          ? { ...t, ...formData, id: editingTask.id, createdAt: editingTask.createdAt }
          : t
      )
    );

    // If currently viewing the same task, update its view details too
    if (viewingTask && viewingTask.id === editingTask.id) {
      setViewingTask((prev) => ({ ...prev, ...formData }));
    }

    setEditingTask(null);
    showToast(`Task updated successfully!`, 'success');
  };

  // Quick Status Toggle directly from card
  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    // Also update viewingTask if open
    if (viewingTask && viewingTask.id === taskId) {
      setViewingTask((prev) => ({ ...prev, status: newStatus }));
    }

    showToast(`Status updated to ${newStatus}`, 'info');
  };

  // Delete Task Trigger
  const handleDeleteTrigger = (task) => {
    setDeletingTask(task);
  };

  // Confirm Delete Execution
  const handleConfirmDelete = () => {
    if (!deletingTask) return;

    setTasks((prev) => prev.filter((t) => t.id !== deletingTask.id));

    if (viewingTask && viewingTask.id === deletingTask.id) {
      setViewingTask(null);
    }

    showToast(`Task "${deletingTask.title}" has been deleted.`, 'success');
    setDeletingTask(null);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSelectedPriority('All');
  };

  // --- Task Counts computation for tabs ---
  const taskCounts = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'Pending').length,
      inProgress: tasks.filter((t) => t.status === 'In Progress').length,
      completed: tasks.filter((t) => t.status === 'Completed').length
    };
  }, [tasks]);

  // --- Filter and Sort tasks dynamically ---
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search filter (title or description)
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(query);
          const matchDesc = task.description.toLowerCase().includes(query);
          if (!matchTitle && !matchDesc) return false;
        }

        // Status filter
        if (selectedStatus !== 'All' && task.status !== selectedStatus) {
          return false;
        }

        // Priority filter
        if (selectedPriority !== 'All' && task.priority !== selectedPriority) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDate-asc') {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === 'dueDate-desc') {
          return new Date(b.dueDate) - new Date(a.dueDate);
        }
        if (sortBy === 'priority-desc') {
          const priorityWeights = { High: 3, Medium: 2, Low: 1 };
          return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
        }
        if (sortBy === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [tasks, searchTerm, selectedStatus, selectedPriority, sortBy]);

  return (
    <div className="app-layout">
      {/* 1. Global Navigation Bar */}
      <Navbar
        onAddTask={() => setIsCreateOpen(true)}
        taskCount={tasks.length}
      />

      {/* 2. Main Content Dashboard Container */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Dashboard Header Title Area */}
          <section className="dashboard-intro">
            <div>
              <h2 className="section-title">Overview & Workflow</h2>
              <p className="section-subtitle">
                Track, organize, and monitor your personal and team tasks efficiently.
              </p>
            </div>
            <div className="quick-actions">
              <button
                className="btn btn-outline"
                onClick={() => {
                  if (window.confirm('Reset dashboard to default initial tasks?')) {
                    setTasks(INITIAL_TASKS);
                    showToast('Tasks reset to default state', 'info');
                  }
                }}
                title="Reset to starter sample tasks"
              >
                Reset Demo Data
              </button>
            </div>
          </section>

          {/* 3. Task Statistics Cards */}
          <DashboardStats
            tasks={tasks}
            activeFilter={selectedStatus}
            onSelectFilter={(status) => setSelectedStatus(status)}
          />

          {/* 4. Controls Toolbar: Search & Filter */}
          <section className="toolbar-section">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onClear={() => setSearchTerm('')}
            />

            <FilterBar
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              sortBy={sortBy}
              onSortChange={setSortBy}
              taskCounts={taskCounts}
            />
          </section>

          {/* Active Filter Summary Bar if filtering is applied */}
          {(searchTerm || selectedStatus !== 'All' || selectedPriority !== 'All') && (
            <div className="active-filter-banner">
              <span className="banner-text">
                Showing <strong>{filteredTasks.length}</strong> of <strong>{tasks.length}</strong> tasks
              </span>
              <button
                type="button"
                className="banner-clear-link"
                onClick={handleResetFilters}
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* 5. Task List / Grid Display */}
          <TaskList
            tasks={filteredTasks}
            totalTasksCount={tasks.length}
            searchTerm={searchTerm}
            selectedStatus={selectedStatus}
            selectedPriority={selectedPriority}
            onResetFilters={handleResetFilters}
            onAddTask={() => setIsCreateOpen(true)}
            onView={(task) => setViewingTask(task)}
            onEdit={(task) => setEditingTask(task)}
            onDelete={handleDeleteTrigger}
            onStatusChange={handleStatusChange}
          />
        </div>
      </main>

      {/* --- Modals & Overlays --- */}

      {/* Create Task Modal */}
      <TaskForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateTask}
        isEditing={false}
      />

      {/* Edit Task Modal */}
      <TaskForm
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdateTask}
        initialData={editingTask}
        isEditing={true}
      />

      {/* View Task Details Modal */}
      <TaskDetails
        isOpen={Boolean(viewingTask)}
        task={viewingTask}
        onClose={() => setViewingTask(null)}
        onEdit={(task) => {
          setViewingTask(null);
          setEditingTask(task);
        }}
        onDelete={(task) => {
          setViewingTask(null);
          handleDeleteTrigger(task);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingTask)}
        taskTitle={deletingTask?.title}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTask(null)}
      />

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
