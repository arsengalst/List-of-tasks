window.nextId = 1;

const CATEGORY_LABELS = {
    work: 'Работа',
    personal: 'Личное',
    study: 'Учёба'
};

// тут добавляю новую задачу с категорией
function addTask(text, category) {
    const task = {
        id: window.nextId++,
        text: text,
        category: category || 'personal',
        completed: false
    };
    window.tasks.push(task);
    saveToStorage(window.tasks);
    return true;
}

// тут переключаю статус задачи
function toggleTask(taskId) {
    const task = window.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveToStorage(window.tasks);
        renderTasks(getFilteredTasks());
    }
}

function deleteTask(taskId) {
    const idx = window.tasks.findIndex(t => t.id === taskId);
    if (idx > -1) {
        window.tasks.splice(idx, 1);
        saveToStorage(window.tasks);
        renderTasks(getFilteredTasks());
    }
}

function editTask(taskId) {
    const task = window.tasks.find(t => t.id === taskId);
    if (task) {
        const newText = prompt('Изменить задачу:', task.text);
        if (newText !== null && newText.trim()) {
            task.text = newText.trim();
            saveToStorage(window.tasks);
            renderTasks(getFilteredTasks());
        }
    }
}

// тут фильтрую задачи по выбранной категории
function getFilteredTasks() {
    if (window.currentFilter === 'all') return window.tasks;
    return window.tasks.filter(t => t.category === window.currentFilter);
}

function setFilter(filter) {
    window.currentFilter = filter;
}

function clearCompleted() {
    window.tasks = window.tasks.filter(t => !t.completed);
    saveToStorage(window.tasks);
    renderTasks(getFilteredTasks());
}
