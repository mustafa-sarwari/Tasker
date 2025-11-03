/**
 * Tasker - Simple Task Management Application
 * Author: Mustafa Sarwari
 * Description: A lightweight to-do list app with localStorage persistence
 */

// DOM Elements
const task = document.querySelector("#txt");
const btn = document.querySelector("#btn");
const ul = document.querySelector("ul");

/**
 * Auto-expand textarea as user types
 * Adjusts height based on content
 */
task.addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

// Initialize task storage
let saveTask;

/**
 * Load saved tasks from localStorage
 * Handles JSON parsing errors and validates array structure
 */
try {
  const raw = localStorage.getItem("task");
  saveTask = raw ? JSON.parse(raw) : [];

  // Ensure saveTask is always an array
  if (!Array.isArray(saveTask)) {
    saveTask = [];
  }
} catch (e) {
  console.error("Error loading tasks from localStorage:", e);
  saveTask = [];
}

/**
 * Render saved tasks on page load
 * Creates list items with remove buttons for each saved task
 */
saveTask.forEach(sT => {
  // Create list item and remove button
  const newLi = document.createElement("li");
  const rBtn = document.createElement("button");
  
  ul.appendChild(newLi);
  newLi.textContent = sT;
  
  newLi.appendChild(rBtn);
  rBtn.classList.add("remove_btn");
  rBtn.textContent = "Remove";
  rBtn.setAttribute("aria-label", `Remove task: ${sT}`);

  /**
   * Handle task removal
   * Removes from DOM and updates localStorage
   */
  rBtn.addEventListener("click", () => {
    ul.removeChild(newLi);
    
    // Update localStorage after removing task
    const index = saveTask.indexOf(sT);
    if (index > -1) {
      saveTask.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(saveTask));
    }
  });
}); 

/**
 * Add a new task to the list
 * @param {Event} event - The click event
 */
function addTask(event) {
  event.preventDefault();
  const taskText = task.value.trim();

  // Validate task input
  if (taskText.length === 0) {
    alert("Please enter a task before adding");
    return;
  }

  // Create new list item
  const newLi = document.createElement("li");
  ul.appendChild(newLi);
  newLi.textContent = taskText;

  // Save to localStorage
  saveTask.push(taskText);
  localStorage.setItem("task", JSON.stringify(saveTask));

  // Reset input field
  task.value = "";
  task.style.height = "auto";

  // Create remove button
  const removeTask = document.createElement("button");
  removeTask.classList.add("remove_btn");
  removeTask.textContent = "Remove";
  removeTask.setAttribute("aria-label", `Remove task: ${taskText}`);
  newLi.appendChild(removeTask);
  
  /**
   * Handle task removal with confirmation
   * Removes from DOM and updates localStorage
   */
  removeTask.addEventListener("click", () => {
    if (confirm("Are you sure you want to remove this task?")) {
      ul.removeChild(newLi);

      // Update localStorage
      const index = saveTask.indexOf(taskText);
      if (index > -1) {
        saveTask.splice(index, 1);
        localStorage.setItem("task", JSON.stringify(saveTask));
      }
    }
  });
}

// Add task on button click
btn.addEventListener("click", addTask);