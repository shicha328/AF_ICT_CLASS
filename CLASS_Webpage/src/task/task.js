// Initialize tasks for all students
let students = {
    student1: [],
    student2: [],
    student3: [],
    student4: [],
    student5: [],
    student6: [],
    student7: []
};

// Load saved tasks from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = localStorage.getItem('studentTasks');
    if (savedTasks) {
        students = JSON.parse(savedTasks);
    }
    updateTaskList();
});

// Get current student
function getCurrentStudent() {
    const select = document.getElementById('studentSelect');
    return select.value;
}

// Update task list display
function updateTaskList() {
    const currentStudent = getCurrentStudent();
    const taskList = document.getElementById('taskList');
    const studentName = document.getElementById('currentStudent');
    
    studentName.textContent = document.getElementById('studentSelect').selectedOptions[0].text + "'s Tasks";
    taskList.innerHTML = '';

    students[currentStudent].forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });

    // Save to localStorage
    localStorage.setItem('studentTasks', JSON.stringify(students));
}

// Add new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        const currentStudent = getCurrentStudent();
        students[currentStudent].push(taskText);
        taskInput.value = '';
        updateTaskList();
    }
}

// Delete task
function deleteTask(index) {
    const currentStudent = getCurrentStudent();
    students[currentStudent].splice(index, 1);
    updateTaskList();
}

// Update task list when student changes
document.getElementById('studentSelect').addEventListener('change', updateTaskList);