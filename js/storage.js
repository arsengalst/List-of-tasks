const STORAGE_KEY = 'tasks-list-v1';

// тут сохраняю задачи в localStorage
function saveToStorage(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// тут загружаю задачи из localStorage при старте
function loadFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    try {
        const tasks = data ? JSON.parse(data) : [];
        if (tasks.length > 0) {
            window.nextId = Math.max(...tasks.map(t => t.id)) + 1;
        }
        return tasks;
    } catch {
        return [];
    }
}
