 // Basic Version 

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click" , ()=>{
    const taskText= taskInput.value.trim();

    if(taskText !==""){
        const newTask = document.createElement("li");
        newTask.classList.add("task-item");
        newTask.textContent= taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent="Delete";

        newTask.addEventListener("click",()=>{
            newTask.classList.toggle("completed");
        })
        
        deleteBtn.addEventListener("click",(e)=>{
            e.stopPropagation()
            newTask.remove();
        })

        newTask.appendChild(deleteBtn);

        taskList.appendChild(newTask);
       
        taskInput.value="";

    }
});










