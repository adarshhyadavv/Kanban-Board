Kanban Board

A simple and interactive Kanban Board built using HTML, CSS, and JavaScript to organize tasks and track their progress.

The board allows users to create tasks, move them between different columns using drag and drop, and save their tasks locally in the browser.

Features

* Create tasks with a title and description
* Organize tasks into three columns: To Do, In Progress, and Done
* Move tasks between columns using drag and drop
* Delete tasks when they are no longer needed
* Display the task count for each column
* Save tasks using localStorage
* Restore saved tasks after refreshing the page
* Modal interface for adding new tasks
* Prevent creating tasks without a title
* Visual feedback when dragging tasks over columns

Technologies Used

* HTML5 — Structures the board, task columns, and modal
* CSS3 — Styles the board, task cards, and modal interface
* JavaScript — Handles task creation, deletion, drag and drop, and task counts
* localStorage — Persists tasks in the browser

Project Structure

Kanban-Board/
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── kanban-board-empty.png
    └── kanban-board-with-tasks.png

JavaScript Concepts Practiced

* DOM manipulation and element creation
* Event listeners and event handling
* Functions and arrow functions
* Arrays and objects
* Array methods such as forEach() and map()
* querySelector() and querySelectorAll()
* Drag-and-drop events
* Conditional statements
* Template literals
* JSON serialization and parsing
* Browser localStorage
* Dynamic UI updates

How Data Is Stored

The board uses browser localStorage to save task titles, descriptions, and their respective columns.

When the page is refreshed, the saved tasks are restored to their previous columns, allowing users to continue where they left off.

Author

Adarsh Yadav