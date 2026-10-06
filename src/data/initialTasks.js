/**
 * Starter mock data for the Task Management Dashboard
 * Each task contains:
 * - id: unique string identifier
 * - title: task name
 * - description: detailed explanation of the task
 * - status: 'Pending' | 'In Progress' | 'Completed'
 * - priority: 'Low' | 'Medium' | 'High'
 * - dueDate: YYYY-MM-DD string format
 * - createdAt: ISO timestamp string
 */

export const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Design System Implementation",
    description: "Create unified CSS tokens, typography scales, and atomic color palettes for dark and light modes.",
    status: "Completed",
    priority: "High",
    dueDate: "2026-10-10",
    createdAt: "2026-10-01T09:00:00Z"
  },
  {
    id: "task-2",
    title: "Develop Task Creation Modal",
    description: "Build an accessible modal form with field validation for title, description, priority, and due dates.",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-10-14",
    createdAt: "2026-10-02T10:30:00Z"
  },
  {
    id: "task-3",
    title: "Integrate Real-Time Search & Filtering",
    description: "Allow users to combine text search across titles and descriptions with multi-status filtering.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2026-10-18",
    createdAt: "2026-10-03T11:15:00Z"
  },
  {
    id: "task-4",
    title: "Configure LocalStorage Persistence",
    description: "Ensure all CRUD actions synchronize with browser localStorage for seamless offline retention.",
    status: "Pending",
    priority: "Medium",
    dueDate: "2026-10-22",
    createdAt: "2026-10-04T14:00:00Z"
  },
  {
    id: "task-5",
    title: "Mobile Responsiveness & Touch Optimization",
    description: "Refactor card layouts and touch targets for seamless usage across smartphones and tablets.",
    status: "Pending",
    priority: "Low",
    dueDate: "2026-10-28",
    createdAt: "2026-10-05T08:45:00Z"
  }
];
