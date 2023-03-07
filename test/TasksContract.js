const TasksContract = artifacts.require("TasksContract")

contract("TasksContract", () => {

    before(async () => {
       this.tasksContract = await TasksContract.deployed()
    })

    // Testeamos si el contrato se ha desplegado correctamente utilizando la función address, si nos devuelve un address valida significa que se ha desplegado correctamente
    it('migrate deployed succesfully', async () => {
        const address = this.tasksContract.address
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
        
    })
})