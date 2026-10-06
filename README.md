# TaskFlow - Modern Task Management Dashboard

A responsive, production-ready **Task Management Dashboard** built with **React**, **Vite**, and **Vanilla CSS**. This project was created as a frontend developer practical assignment showcasing clean component architecture, state management with React Hooks, real-time filtering, validation, and browser persistence.

---

## 🌟 Key Features

### 1. 📊 Interactive Dashboard & Metrics
* **Live Statistics**: Dynamic counters for *Total Tasks*, *Pending*, *In Progress*, and *Completed* tasks.
* **Completion Progress Bar**: Automatically calculates and animates overall percentage of completed tasks.
* **Filter by Card**: Clicking any stat card filters the list directly to that status.

### 2. 📝 Full Task CRUD
* **Create Tasks**: Accessible modal form with live validation for *Title*, *Description*, *Status*, *Priority*, and *Due Date*.
* **View Task Details**: Modal inspection displaying all attributes, status tags, priority indicators, and formatted dates.
* **Edit Tasks**: Pre-populated modal allowing updates to any task field without duplication.
* **Delete Tasks**: Safe workflow with a custom confirmation dialog.

### 3. 🔍 Dynamic Real-Time Search & Status Filtering
* **Instant Text Search**: Matches across task titles and descriptions as you type.
* **Status Filter Tabs**: Easily toggle between *All*, *Pending*, *In Progress*, and *Completed*.
* **Priority & Sorting**: Secondary dropdowns to filter by priority (*High*, *Medium*, *Low*) and sort by *Due Date*, *Priority*, or *Title*.
* **Combined Filtering**: Search and filters work seamlessly together.

### 4. 💾 LocalStorage Persistence
* All changes (adding, editing, deleting, updating status) persist across page reloads via browser `localStorage`.
* Includes starter mock tasks on first launch, with a "Reset Demo Data" option.

### 5. 🎨 Design & Accessibility
* Handcrafted **Vanilla CSS** design system utilizing CSS Custom Properties (variables).
* Status indicators:
  * 🟡 **Pending** (Amber/Yellow style)
  * 🔵 **In Progress** (Blue style)
  * 🟢 **Completed** (Green style)
* Priority indicators:
  * ⚪ **Low** (Slate style)
  * 🟡 **Medium** (Amber style)
  * 🔴 **High** (Rose style)
* Fully responsive layout optimized for desktop, tablet, and mobile screens.

---

## 🛠️ Technology Stack

* **Framework**: React 18
* **Build Tool**: Vite
* **Language**: JavaScript (ES6+)
* **Styling**: Vanilla CSS (Variables, Flexbox, CSS Grid)
* **Icons**: Inline SVG Icons (zero external icon dependency overhead)
* **Storage**: Browser `localStorage` API

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ConfirmDialog.jsx      # Confirmation modal for task deletion
│   ├── DashboardStats.jsx     # Live metrics cards & progress bar
│   ├── FilterBar.jsx          # Status tabs, priority filter, & sort
│   ├── Navbar.jsx             # Header bar, logo, and Add Task trigger
│   ├── SearchBar.jsx          # Real-time search input with clear button
│   ├── TaskCard.jsx           # Individual task card with status badges & actions
│   ├── TaskDetails.jsx        # Detailed view modal
│   ├── TaskForm.jsx           # Create & Edit form with field validation
│   ├── TaskList.jsx           # Grid view with empty state handlers
│   └── Toast.jsx              # Feedback toast for user actions
│
├── data/
│   └── initialTasks.js        # Starter mock tasks data
│
├── App.jsx                    # Root state, handlers, and persistence
├── App.css                    # Dashboard & component layouts
├── main.jsx                   # Application entry point
└── index.css                  # Design system tokens and CSS reset
```

---

## 🚀 Getting Started

### 1. Clone or Open the Project
```bash
git clone <your-repository-url>
cd gupio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) (or the displayed terminal port) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📄 License
MIT License. Created for frontend developer practical evaluation.
