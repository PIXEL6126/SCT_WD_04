// script.js
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const todoLists = document.getElementById('todo-lists');

let todos = [];

todoForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    const task = taskInput.value;
    const date = taskDate.value;
    const todo = {
        id: Date.now(),
        task: task,
        date: date,
        completed: false,
    };
    todos.push(todo);
    taskInput.value = '';
    taskDate.value = '';
    renderTodos();
}

function renderTodos() {
    todoLists.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        if (todo.completed) {
            todoItem.classList.add('completed');
        }

        todoItem.innerHTML = `
            <div class="task-info">
                <p>${todo.task}</p>
                <small>${new Date(todo.date).toLocaleString()}</small>
            </div>
            <div class="actions">
                <button onclick="completeTask(${todo.id})">${todo.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit" onclick="editTask(${todo.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${todo.id})">Delete</button>
            </div>
        `;
        todoLists.appendChild(todoItem);
    });
}

function completeTask(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    renderTodos();
}

function editTask(id) {
    const newTask = prompt('Edit your task:');
    const newDate = prompt('Edit your date (YYYY-MM-DDTHH:MM):');
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.task = newTask;
            todo.date = newDate;
        }
        return todo;
    });
    renderTodos();
}

function deleteTask(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}
