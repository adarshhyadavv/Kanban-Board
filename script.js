/* -------- BOARD STATE ------- */

// Stores all tasks grouped by column
let tasksData = {};

/* -------- DOM ELEMENTS ------- */

// Kanban columns
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

// Store all columns in one array
const columns = [todo, progress, done];

// Stores the task currently being dragged
let draggedElement = null;


/* -------- TASK CREATION ------- */

// Creates a new task card and adds it to the given column
function addTask(title, desc, column) {
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable","true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>delete</button>
    `;

    column.appendChild(div);

    // Store the task when dragging starts
    div.addEventListener("drag",()=> {
        draggedElement = div;
    });

    // Delete task
    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    });
    return div;
}


/* -------- TASK COUNT & LOCAL STORAGE ------- */

// Updates task counts for every column
// and saves the current board state to localStorage
function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        // Convert task elements into plain JavaScript objects
        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                title : t.querySelector("h2").innerText,
                desc : t.querySelector("p").innerText
            };
        });
        
        // Update visible task count
        count.innerText = tasks.length;
    });

    // Save current board data
    localStorage.setItem("tasks", JSON.stringify(tasksData));
}


/* -------- LOAD SAVED TASKS ------- */

// Restore tasks from localStorage when the page loads
if(localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    for(const col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach(task => {
            addTask(task.title, task.desc, column);
        });
    }

    updateTaskCount();
}


/* -------- COLUMN DRAG EVENTS ------- */

// Adds drag-and-drop functionality to a column
function addDragEventsOnColumn(column) {

    // When a task enters the column
    column.addEventListener("dragenter",(e)=> {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    // When a task leaves the column
    column.addEventListener("dragleave",(e)=> {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    // Allows the task to be dropped
    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
    });

    // Move the task into the column
    column.addEventListener("drop",(e)=> {
        e.preventDefault();
        column.appendChild(draggedElement);
        column.classList.remove("hover-over");

        updateTaskCount();
    });
}

// Add drag-and-drop events to all columns
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);


/* -------- ADD TASK MODAL ------- */

// Modal elements
const toggleModalButton= document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector("#add-new-task");

// Open modal
toggleModalButton.addEventListener("click",()=> {
    modal.classList.add("active");
});

// Close modal by clicking the background
modalbg.addEventListener("click",()=> {
    modal.classList.remove("active");
});

// Add new task
addTaskButton.addEventListener("click",() => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    if(taskTitle.trim() === "") {
        return;
    }

    // New tasks are added to the To Do column
    addTask(taskTitle, taskDesc, todo);

    // Update count and save board data
    updateTaskCount(); 

    // Close modal
    modal.classList.remove("active");

    // Clear input fields
    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";
});