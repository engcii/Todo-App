

document.addEventListener("DOMContentLoaded", ()=>{
    autoSave();
    loadTasks()
})

function addTask() {
    let taskInput = document.getElementById('task-input');
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("fadlan shaqada soo geli")
        return;
    }

    let taskList = document.getElementById('task-list');
    let li = document.createElement('li');
    li.innerHTML = `
                    <span>${taskText}</span>
                <div class="task-buttons">
                    <button class="complete-button" onclick="toggleComplete(this)">✔</button>
                    <button class="edit-button" onclick="editTask(this)">✏</button>
                    <button class="delete-button" onclick="removeTask(this)">X</button>
                </div>
    `
    taskList.appendChild(li);
    // saveTasks();
    taskInput.value = "";
}
// toggle complet Task
function toggleComplete(button) {
    let task = button.parentElement.parentElement;
    task.classList.toggle("completed");
    // saveTasks();
}

// edit task

function editTask(button) {
    let task = button.parentElement.parentElement;
    let taskText = task.querySelector("span").textContent;

    let newTaskText = prompt("Edit your task", taskText);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        task.querySelector("span").textContent = newTaskText.trim()
        // saveTasks()
    }
}

// Remove Task

function removeTask(button) {
    let task = button.parentElement.parentElement
    task.remove()
    // saveTasks()
}

// save to local Storage

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#task-list li").forEach(task => {
        tasks.push({
            text: document.querySelector("span").textContent,
            complete: task.classList.contains("completed")
        })
        localStorage.setItem("tasks", JSON.stringify(tasks))
    })
}

function autoSave(){
    let taskList = document.getElementById("task-list");

    let observer = new MutationObserver( ()=>{
        saveTasks()
    })


    observer.observe(taskList, 
        {
            childList:true,
            subtree:true,
            characterData:true
        }
    )
}



// load task from local stotage
function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        let tasks = JSON.parse(savedTasks);
        let taskList = document.getElementById("task-list");

        tasks.forEach(task => {
            let li = document.createElement('li');
            li.innerHTML = `
                            <span>${task.text}</span>
                        <div class="task-buttons">
                            <button class="complete-button" onclick="toggleComplete(this)">✔</button>
                            <button class="edit-button" onclick="editTask(this)">✏</button>
                            <button class="delete-button" onclick="removeTask(this)">X</button>
                        </div>
            `
            if(task.completed){
                li.classList("completed")
            }
            taskList.appendChild(li)
        })
    }
}


