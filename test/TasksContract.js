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

    it("task created successfully", async () => {
        const result = await this.tasksContract.createTask("some task", "description two");
        const taskEvent = result.logs[0].args;
        const taskCounter = await this.tasksContract.taskCounter();

        assert.equal(taskCounter)
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "some task");
        assert.equal(taskEvent.description, "description two");
        assert.equal(taskEvent.done, false);
    })
})