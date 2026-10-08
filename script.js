let todos = [];

const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todosList = document.getElementById('todos-list');
const errorMessage = document.getElementById('error-message');
const completedCountSpan = document.getElementById('completed-count');

function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
        errorMessage.textContent = 'Fill in input';
        return;
    }

    errorMessage.textContent = '';

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);
    renderTodos();
    todoInput.value = '';
}

function renderTodos() {

    todosList.innerHTML = '';

    sortedTodos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) {
            li.classList.add('completed');
        }

        const textSpan = document.createElement('span');
        textSpan.classList.add('todo-text');
        textSpan.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '<img src="image.png" alt="Delete">';

        li.addEventListener('click', (e) => {
            if (e.target !== deleteBtn && e.target.parentNode !== deleteBtn) {
                toggleCompleted(todo.id);
            }
        });

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
        });

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        todosList.appendChild(li);
    });

    updateCounter();
}

function toggleCompleted(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

function updateCounter() {
    const completed = todos.filter(t => t.completed).length;
    const total = todos.length;
    completedCountSpan.textContent = `${completed} completed`;
}

addTodoBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

renderTodos();