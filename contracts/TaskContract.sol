// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract TaskContract{

    uint taskCounter = 0;

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

    //function toggleDone () {} 

}