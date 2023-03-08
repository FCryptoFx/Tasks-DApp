App = {

    contracts: {},

    init: async () => {
        console.log('Loaded')
        await App.loadEthereum()
        await App.loadAccount()
        await App.loadContracts()
        await App.render()
        await App.renderTask()
    },

    loadEthereum: async () => {

        if (window.ethereum) {
            App.web3Provider = window.ethereum
            await window.ethereum.request({ method: 'eth_requestAccounts' })

        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider)

        } else {
            console.log('No ethereum browser is installed. Try it installing Metamask.')
        }
    },

    loadAccount: async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        App.account = accounts[0]
        console.log(accounts)

    },

    loadContracts: async () => {
        //Recogemos el JSON
        const res = await fetch("TasksContract.json");
        const tasksContractJSON = await res.json();

        //Utilizando el JSON lo convertimos con Truffle
        App.contracts.tasksContract = TruffleContract(tasksContractJSON)

        //Conectamos ese contrato con Metamask
        App.contracts.tasksContract.setProvider(App.web3Provider)

        //Una vez conectado a Metamask desplegamos el contrato
        App.taskContract = await App.contracts.tasksContract.deployed()
    },

    render: () => {
        document.getElementById('account').innerText = App.account
    },

    renderTask: async () => {
        const taskCounter = await App.taskContract.taskCounter()
        const taskCounterNumber = taskCounter.toNumber()

        let html = ''

        for (let i = 1; i <= taskCounterNumber; i++) {
            const task = await App.taskContract.tasks(i)

            const taskId = task[0].toNumber();
            const taskTitle = task[1];
            const taskDescription = task[2];
            const taskDone = task[3];
            const taskCreatedAt = task[4];

            // Creando las targetas de tareas
            let taskElement = `<div class="card bg-dark mb-2">

                <div class="card-header d-flex justify-content-between align-items-center">
                    <span>${taskTitle}</span>

                    <div class="form-check form-switch">
                    <input class="form-check-input" data-id="${taskId}" type="checkbox" ${taskDone === true && "checked"}
                        onchange="App.toggleDone(this)"/>
                    </div>

                 </div>

                 <div class="card-body">
                    <span>${taskDescription}</span>
                    <p class="text-muted">Task was created at: ${new Date(taskCreatedAt * 1000).toLocaleString()}</p>
                    </label>
                 </div>
                </div>`;
                html += taskElement;
        }

        document.querySelector("#tasksList").innerHTML = html;
        },

    createTask: async (title, description) => {
        const result = await App.taskContract.createTask(title, description, {
            from: App.account
        })
        console.log(result.logs[0].args)
    },

    toggleDone: async (element) => {
        const taskId = element.dataset.id

        await App.taskContract.toggleDone(taskId, {
            from: App.account,
        })

        window.location.reload()
    },
};