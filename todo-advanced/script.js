//Advanced Version

// Grab references
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
window.addEventListener("DOMContentLoaded", loadTasksFromStorage);

// Add task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    createTaskElement(taskText);
    saveTaskToStorage(taskText);
    taskInput.value = "";
  }
});

// Create task element
function createTaskElement(text, completed = false) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  if (completed) taskItem.classList.add("completed");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    taskItem.classList.toggle("completed");
    updateTaskCompletionInStorage(text, checkbox.checked);
  });

  // Text
  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("task-text");

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.innerHTML = `<i class="fas fa-pen"></i>`;
  editBtn.classList.add("edit-btn");
  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText) {
      updateTaskTextInStorage(span.textContent, newText);
      span.textContent = newText;
    }
  });

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    taskItem.remove();
    deleteTaskFromStorage(span.textContent);
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(span);
  taskItem.appendChild(editBtn);
  taskItem.appendChild(deleteBtn);

  taskList.appendChild(taskItem);
}

// Local Storage Functions
function saveTaskToStorage(text, completed = false) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskElement(task.text, task.completed));
}

function deleteTaskFromStorage(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCompletionInStorage(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) =>
    task.text === text ? { ...task, completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskTextInStorage(oldText, newText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) =>
    task.text === oldText ? { ...task, text: newText } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}