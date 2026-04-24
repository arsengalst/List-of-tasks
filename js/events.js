function initEvents() {
    initDOM();

    // тут вешаю события на кнопку добавления и поле ввода
    DOM.addBtn?.addEventListener('click', addNewTask);
    DOM.taskInput?.addEventListener('keypress', e => {
        if (e.key === 'Enter') addNewTask();
    });

    DOM.allFilter?.addEventListener('click', () => applyFilter('all'));
    DOM.workFilter?.addEventListener('click', () => applyFilter('work'));
    DOM.personalFilter?.addEventListener('click', () => applyFilter('personal'));
    DOM.studyFilter?.addEventListener('click', () => applyFilter('study'));

    DOM.clearCompleted?.addEventListener('click', () => {
        if (confirm('Удалить все выполненные задачи?')) clearCompleted();
    });
}

function applyFilter(filter) {
    setFilter(filter);
    renderTasks(getFilteredTasks());
    updateFilterButtons();
}

function addNewTask() {
    const text = DOM.taskInput?.value?.trim();
    const category = DOM.categorySelect?.value || 'personal';
    if (text && addTask(text, category)) {
        DOM.taskInput.value = '';
        renderTasks(getFilteredTasks());
    }
}
