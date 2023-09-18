const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');
/*
const minus = document.createElementNS("http://www.w3.org/2000/svg", "svg");
minus.setAttribute("width", "20");
minus.setAttribute("height", "20");
minus.setAttribute("viewBox", "0 0 16 16");
minus.setAttribute("fill", "currentColor");
minus.setAttribute("class", "bi bi-dash");
const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z");
*/
function createLi() {
    const li = document.createElement('li');
    return li;
}

inputTask.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    }
});

function cleanInput() {
    inputTask.value = '';
    inputTask.focus();
}

function createDeleteButton (li) {
    //minus.appendChild(path);
    li.innerText += ' ';
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '-';
    //deleteButton.appendChild(minus); // usar appendChild ao inves de innerhtml por conta de ser um icone e nao um texto
    deleteButton.setAttribute('class', 'delete');
    deleteButton.setAttribute('title', 'Delete this task');
    li.appendChild(deleteButton);
}

function createTask(textInput) {
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    cleanInput();
    createDeleteButton(li);
    saveTasks();
}

btnTask.addEventListener('click', function() {
    if (!inputTask.value) return;
    createTask(inputTask.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('delete')) {
        el.parentElement.remove();
        saveTasks();
        inputTask.focus();
    }
});

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const taskArray =[];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('-', '').trim();
        taskArray.push(taskText);  
    }
    const taskJSON = JSON.stringify(taskArray);//array convertido em string de json
    localStorage.setItem('tasks', taskJSON) //salva strings
}

function addSavedTasks(){
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks); //parse transfere um arquivo js para formato JS

    for (let task of taskList) {
        createTask(task); 
    }
}
addSavedTasks();