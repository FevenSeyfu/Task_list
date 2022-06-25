const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
    // Add task event
   form.addEventListener('submit',addTask);

    // remove  task event 
    taskList.addEventListener('click',removeTask);

    // clear task event
    clearBtn.addEventListener('click',clearTasks);

    // filter tasks event
    filter.addEventListener('keyup',filterTask);

    // DomLoad event
    document.addEventListener('DOMContentLoaded',getTasks)
}
// get tasks from local storage
function getTasks(){
     let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        // create li element
        const li= document.createElement('li');
        //add class to class element
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));

        // create new link element for remove task
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML ="<i class='fa fa-remove'></i>";
        // Append link to li
        li.appendChild(link)

        // Append li to ul
        taskList.appendChild(li)
    })
}
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task!')
    }
    // create li element
    const li= document.createElement('li');
    //add class to class element
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element for remove task
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML ="<i class='fa fa-remove'></i>";
    // Append link to li
    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li)

    // save task to local storage
    StoreToLocalStorage(taskInput.value);

    // clear input
    taskInput.value='';

    e.preventDefault();
}
function StoreToLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
       if(confirm('Are you sure ?'))
        { 
           e.target.parentElement.parentElement.remove();
           removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}
// Remove from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
// Clear Tasks
 function clearTasks(e){
    //  taskList.innerHTML = '';

    // faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
 }
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
//  filter Tasks
function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display ='block';
            }else{
                task.style.display = 'none';
            }
    });
}