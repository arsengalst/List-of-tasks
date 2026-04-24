const DOM = {
    taskInput: null,
    categorySelect: null,
    addBtn: null,
    taskList: null,
    allFilter: null,
    workFilter: null,
    personalFilter: null,
    studyFilter: null,
    clearCompleted: null,
    statsText: null
};

function initDOM() {
    DOM.taskInput = document.getElementById('taskInput');
    DOM.categorySelect = document.getElementById('categorySelect');
    DOM.addBtn = document.getElementById('addBtn');
    DOM.taskList = document.getElementById('taskList');
    DOM.allFilter = document.getElementById('allFilter');
    DOM.workFilter = document.getElementById('workFilter');
    DOM.personalFilter = document.getElementById('personalFilter');
    DOM.studyFilter = document.getElementById('studyFilter');
    DOM.clearCompleted = document.getElementById('clearCompleted');
    DOM.statsText = document.getElementById('statsText');
}

// тут создаю элемент задачи в списке
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text' + (task.completed ? ' completed' : '');
    textSpan.textContent = task.text;

    const badge = document.createElement('span');
    badge.className = 'category-badge badge-' + task.category;
    badge.textContent = CATEGORY_LABELS[task.category] || task.category;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-edit';
    editBtn.textContent = '✏️';

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-delete';
    delBtn.textContent = '🗑️';

    actions.append(editBtn, delBtn);
    li.append(checkbox, textSpan, badge, actions);

    checkbox.addEventListener('change', () => toggleTask(task.id));
    editBtn.addEventListener('click', () => editTask(task.id));
    delBtn.addEventListener('click', () => deleteTask(task.id));

    return li;
}

function renderTasks(tasks) {
    DOM.taskList.innerHTML = '';
    tasks.forEach(task => DOM.taskList.appendChild(createTaskElement(task)));
    updateStats(tasks.length);
}

function updateStats(count) {
    if (DOM.statsText) DOM.statsText.textContent = 'Задач: ' + count;
}

function updateFilterButtons() {
    const map = { all: DOM.allFilter, work: DOM.workFilter, personal: DOM.personalFilter, study: DOM.studyFilter };
    Object.entries(map).forEach(([key, btn]) => {
        if (btn) btn.classList.toggle('active', key === window.currentFilter);
    });
}
