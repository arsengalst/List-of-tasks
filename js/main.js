// тут инициализирую приложение - загружаю задачи и запускаю события
function initApp() {
    window.tasks = loadFromStorage();
    window.currentFilter = 'all';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
}

function start() {
    initEvents();
    renderTasks(getFilteredTasks());
    updateFilterButtons();
}

initApp();
