let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let draggedElement = null;

const columns = [todo,progress,done];

const task = document.querySelectorAll(".task");

task.forEach(task => {
    task.addEventListener("drag",(e) => {
        draggedElement = task;
    })
})

function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter",(e)=> {
        e.preventDefault();
        column.classList.add("hover-over");
    })

    column.addEventListener("dragleave",(e)=> {
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
    })

    column.addEventListener("drop",(e)=> {
        e.preventDefault();
        column.appendChild(draggedElement);
        column.classList.remove("hover-over");

        columns.forEach(col => {
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");


            count.innerText = tasks.length;
        })
    })
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);


const toggleModalButton= document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector("#add-new-task");


toggleModalButton.addEventListener("click",()=> {
    modal.classList.add("active");
})

modalbg.addEventListener("click",()=> {
    modal.classList.remove("active");
})

addTaskButton.addEventListener("click",() => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable","true");

    div.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDesc}</p>
    <button>delete</button>`

    todo.appendChild(div);

    div.addEventListener("drag",()=> {
        draggedElement = div;
    })

    modal.classList.remove("active");

    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
        count.innerText = tasks.length;

        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                title : t.querySelector("h2").innerText,
                desc : t.querySelector("p").innerText
            }
        });

        localStorage.setItem("tasks",JSON.stringify(tasksData));
    }) 
})