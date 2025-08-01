document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li span').forEach(span => {
            tasks.push(span.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task to the DOM and optionally save to local storage
    function addTask(taskText, save = true) {
        const listItem = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            saveTasks();
        };

        listItem.appendChild(taskSpan);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (save) {
            saveTasks();
        }
    }

    // Add task on button click or Enter key
    function handleAddTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        addTask(taskText);
        taskInput.value = '';
    }

    addButton.addEventListener('click', handleAddTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });

    loadTasks(); // Load tasks when the page loads
});
