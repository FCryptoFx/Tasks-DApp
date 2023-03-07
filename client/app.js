App = {

    contracts: {},
    
    init: () => {
        console.log('Loaded')
        App.loadEthereum()
        App.loadContracts()
    },

    loadEthereum: async () => {

        if(window.ethereum){
            App.web3Provider = window.ethereum
            await window.ethereum.request({method: 'eth_requestAccounts'})

        } else if (window.web3){
            web3 = new Web3(window.web3.currentProvider)

        } else {
            console.log('No ethereum browser is installed. Try it installing Metamask.')
        }
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
    }
}

App.init()
    