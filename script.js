let todos = [];

const todoInput = document.getElementById('todo-input');
const prioritySelect = document.getElementById('todo-priority');
const addTodoBtn = document.getElementById('add-todo-btn');
const todosList = document.getElementById('todos-list');
const errorMessage = document.getElementById('error-message');
const completedCountSpan = document.getElementById('completed-count');

function addTodo() {
    const text = todoInput.value.trim();
    const priority = prioritySelect.value;

    if (text === '') {
        errorMessage.textContent = 'Fill in input';
        return;
    }

    errorMessage.textContent = '';

    const todo = {
        id: Date.now(),
        text: text,
        priority: priority,
        completed: false
    };

    todos.push(todo);
    renderTodos();
    todoInput.value = '';
}

function renderTodos() {

    todosList.innerHTML = '';

    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const sortedTodos = [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    sortedTodos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) {
            li.classList.add('completed');
        }

        const textSpan = document.createElement('span');
        textSpan.classList.add('todo-text');
        textSpan.textContent = todo.text;

        const priorityBadge = document.createElement('span');
        priorityBadge.classList.add('priority-badge', `priority-${todo.priority}`);
        priorityBadge.textContent = todo.priority;

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
        li.appendChild(priorityBadge);
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
    completedCountSpan.textContent = `Completed ${completed} out of ${total}`;
}

addTodoBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

renderTodos();