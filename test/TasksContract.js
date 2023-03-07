const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {

    before(async () => {
        this.tasksContract = await TasksContract.deployed();
    })

    // Testeamos si el contrato se ha desplegado correctamente utilizando la función address, si nos devuelve un address valida significa que se ha desplegado correctamente
    it('migrate deployed succesfully', async () => {
        const address = this.tasksContract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })

    // Testeamos que se muestran/recogen bien las tareas comprobando que el id de la última tarea creada, sea igual a la cantidad de tareas, es decir al "taskCounter"
    it("get Task List", async () => {
        const taskCounter = await this.tasksContract.taskCounter();
        const task = await this.tasksContract.tasks(taskCounter);

        assert.equal(task.id.toNumber(), taskCounter);
        assert.equal(task.title, "Mi primera tarea de ejemplo");
        assert.equal(task.description, "Tengo que hacer algo");
        assert.equal(taskCounter, 1);
    })

    //Testeamos que la tarea se crea correctamente
    it("task created successfully", async () => {
        const result = await this.tasksContract.createTask("some task", "description two");
        const taskEvent = result.logs[0].args;
        const taskCounter = await this.tasksContract.taskCounter();

        assert.equal(taskCounter, 2)
        assert.equal(taskEvent.id.toNumber(), 2); // Comprobamos que el id del task Event sea 2
        assert.equal(taskEvent.title, "some task"); // Comprobamos que el título sea igual al estipulado en la variable result
        assert.equal(taskEvent.description, "description two"); // COmprobamos que la descripcion sea igual al estipulado en la variable result
        assert.equal(taskEvent.done, false); // Comprobamos que al crear la tarea el atributo "done" se inicialize en false.
    })

    //Testeamos que la tarea cambie el estado de la variable "done"
    it("task toggle done", async () => {
        const result = await this.tasksContract.toggleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.tasksContract.tasks(1);

        assert.equal(task.done, true);
        assert.equal(taskEvent.done, true);
        assert.equal(taskEvent.id, 1);
    })
})