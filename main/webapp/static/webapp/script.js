document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("task-form");
    const taskNameInput = document.getElementById("task-name");
    const pendingColumn = document.getElementById("pending");

    // Función para crear una nueva tarea
    function createTask(taskName) {
        const task = document.createElement("div");
        task.classList.add("task");
        task.textContent = taskName;
        task.setAttribute("draggable", true);

        // Eventos de arrastrar y soltar
        task.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", taskName);
            e.target.classList.add("dragging");
        });

        task.addEventListener("dragend", (e) => {
            e.target.classList.remove("dragging");
        });

        return task;
    }

    // Agregar nueva tarea a la columna "Pendiente"
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const taskName = taskNameInput.value.trim();
        if (taskName === "") {
            alert("Por favor, ingresa un nombre para la tarea.");
            return;
        }

        const newTask = createTask(taskName);
        pendingColumn.appendChild(newTask);
        taskNameInput.value = "";
    });

    // Hacer que las columnas acepten tareas arrastradas
    document.querySelectorAll(".column").forEach((column) => {
        column.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        column.addEventListener("drop", (e) => {
            e.preventDefault();
            const draggedTaskName = e.dataTransfer.getData("text/plain");
            const newTask = createTask(draggedTaskName);
            column.appendChild(newTask);
        });
    });
});
