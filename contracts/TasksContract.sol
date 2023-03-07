// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract TasksContract{

    uint public taskCounter = 0;

    constructor(){
        createTask("Mi primera tarea de ejemplo", "Tengo que hacer algo");
    }

    struct Task{
        uint id;
        string title;
        string description;
        bool done;
        uint createdAt;
    }

    mapping (uint => Task) public tasks;

    function createTask(string memory _title, string memory _description) public {

        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        taskCounter ++;
    }

    function toggleDone (uint _id) public {

        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
    } 
}