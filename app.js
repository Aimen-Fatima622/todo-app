
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMessage = document.getElementById("emptyMessage");

const themeButton = document.getElementById("themeButton");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    saveTasks();
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const listItem = document.createElement("li");
        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "task-buttons";

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed
            ? "Undo"
            : "Complete";
        completeButton.className = "complete-button";

        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;

            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
        });

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(deleteButton);

        listItem.appendChild(taskText);
        listItem.appendChild(buttonContainer);

        taskList.appendChild(listItem);
    });

    updateTaskCounters();
    updateProgress();
}

function updateTaskCounters() {
    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;

    if (total === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

function updateProgress() {
    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    let progress = 0;

    if (total > 0) {
        progress = Math.round((completed / total) * 100);
    }

    progressText.textContent = progress + "%";
    progressFill.style.width = progress + "%";
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks();
