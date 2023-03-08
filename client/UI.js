const taskForm = document.querySelector("#taskForm")

document.addEventListener("DOMContentLoaded", () => {
    App.init()
})

taskForm.addEventListener("submit", e => {
    e.preventDefault(); // Cancelamos el refresh que hace la página por defecto cada vez que pulsamos el boton de formulario

    App.createTask(taskForm["title"].value, taskForm["description"].value);
})