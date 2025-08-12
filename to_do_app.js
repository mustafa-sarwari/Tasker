const task = document.querySelector("#txt");
const btn = document.querySelector("#btn");
const ul = document.querySelector("ul");

task.addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
})
let saveTask;

try{
  const raw = localStorage.getItem("task");
  saveTask = raw ? JSON.parse(raw) : [];

  if(!Array.isArray(saveTask)){
    saveTask = [];
  }
}

catch(e) {
  saveTask = [];
}

saveTask.forEach(sT => {

  // creating li and button to reload the saved files/datas from the local storage.
    const newLi = document.createElement("li");
    const rBtn = document.createElement("button");
    ul.appendChild(newLi);
    newLi.textContent = sT;


    newLi.appendChild(rBtn);
    rBtn.classList.add("remove_btn");
    rBtn.textContent = "Remove";

    // Event Listener for the button to remove they li we want
    rBtn.addEventListener("click", () => {
      ul.removeChild(newLi)
    

    //updating the local storage after removing a li.

    const index = saveTask.indexOf(sT);
    if(index > -1){
      saveTask.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(saveTask));
    }
    });

}); 


function addTask(event){
  event.preventDefault();
  const taskText = task.value.trim();

  if(taskText.length === 0 ){
    alert("Empty Plese First Put Yor Note/Task");
    return;
  }

  const newLi = document.createElement("li");
  ul.appendChild(newLi);
  newLi.textContent = taskText;


  saveTask.push(taskText);
  localStorage.setItem("task", JSON.stringify(saveTask));

  task.value = "";
  task.style.height = "auto";




  //remove task part:
  const removeTask = document.createElement("button");
  removeTask.classList.add("remove_btn");
  removeTask.textContent = "Remove";
  newLi.appendChild(removeTask)
  
  removeTask.addEventListener("click", () => {
    if (confirm("Are you sure you want to remove this task?")) {
      ul.removeChild(newLi);

      const index = saveTask.indexOf(taskText);
      if (index > -1) {
        saveTask.splice(index, 1);
        localStorage.setItem("task", JSON.stringify(saveTask))
      }
    }
  })


}

btn.addEventListener("click", addTask);