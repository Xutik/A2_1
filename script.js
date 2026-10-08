let todos = [];

const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todosList = document.getElementById('todos-list');
const errorMessage = document.getElementById('error-message');
const completedCountSpan = document.getElementById('completed-count');

function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
        errorMessage.textContent = 'Input must not be empty';
        return;
    }

    errorMessage.textContent = '';

    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        twicecompleted: false
    };

    todos.push(todo);
    todoInput.value = '';
    todoInput.focus();
    renderTodos();
}

function renderTodos() {

    todosList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) {
            li.classList.add('completed');
        }
        if (todo.twiceCompleted) {
            li.classList.add('twice-completed');
        }

        const textSpan = document.createElement('span');
        textSpan.classList.add('todo-text');
        textSpan.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = "🗑";

        li.addEventListener('click', (e) => {
            if (e.target.closest('.delete-btn')) {
                return;
            }
            changeTaskState(todo.id);
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
function changeTaskState(id) {
    const todo = todos.find((task) => task.id === id);

    if (!todo) {
        return;
    }

    if (!todo.completed) {
        todo.completed = true;
        todo.twiceCompleted = false;

    } else if (!todo.twiceCompleted) {
        todo.twiceCompleted = true;
    } else {
        todo.completed = false;
        todo.twiceCompleted = false;
    }
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

function updateCounter() {
    const completed = todos.filter(t => t.completed).length;
    completedCountSpan.textContent = `${completed} completed`;
}

addTodoBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

renderTodos();