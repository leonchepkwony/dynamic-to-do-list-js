document.addEventListener(DOMContentLoaded, function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function addTask() {
    const taskText = taskInput.value.trim();

    if (!taskText === "") {
      alert("Please enter a task.");
      return;
    } else {
      // new list element
      const li = document.createElement("li");
      li.textContent = taskText;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");

      //add Event
      removeButton.onclick = () => {
        taskList.removeChild(li);
      };

      //Appending the button
      li.appendChild(removeButton);
      taskList.appendChild(li);

      // clear the input field
      taskInput.value = "";
    }
    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  }
});
