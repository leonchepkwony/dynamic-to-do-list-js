document.addEventListener("DOMContentLoaded", () => {
  // 1. Select DOM Elements:
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // A global array to hold our tasks. This will be the single source of truth.
  let tasks = [];

  // --- Function to create a task element and attach the remove listener ---
  function createTaskElement(taskText) {
    const newListItem = document.createElement("li");
    newListItem.textContent = taskText;
    newListItem.classList.add("task-item");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");

    newListItem.appendChild(removeBtn);
    taskList.appendChild(newListItem);
  }

  // --- Initialize and Load Tasks from Local Storage ---
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = storedTasks; // Update the global tasks array
    tasks.forEach((task) => {
      createTaskElement(task);
    });
  }

  // --- Function to save the current tasks array to Local Storage ---
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // --- Update Task Addition Functionality ---
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return; // Exit the function if input is empty
    }

    // Add the new task to the global array
    tasks.push(taskText);

    // Create the new task element on the page
    createTaskElement(taskText);

    // Save the updated tasks array to Local Storage
    saveTasks();

    // Clear the input field
    taskInput.value = "";
  }

  // --- Implement Task Removal with Local Storage Update ---
  taskList.addEventListener("click", (event) => {
    // Check if the clicked element is a remove button
    if (event.target.classList.contains("remove-btn")) {
      const listItem = event.target.parentElement;
      const taskText = listItem.firstChild.textContent; // Get the text of the task

      // Find the index of the task in the tasks array and remove it
      const taskIndex = tasks.indexOf(taskText);
      if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
      }

      // Remove the list item from the DOM
      listItem.remove();

      // Save the updated tasks array to Local Storage
      saveTasks();
    }
  });

  // --- Attach Event Listeners ---
  addButton.addEventListener("click", addTask);

  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Call loadTasks when the page first loads
  loadTasks();
});
