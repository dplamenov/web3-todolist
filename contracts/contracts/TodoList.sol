//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TodoList {
    struct Todo {
        string todo;
    }

    mapping(address => Todo[]) todos;

    function addTodo(string memory _todo) public {
        return todos[msg.sender].push(Todo(_todo));
    }

    function getTodos() public view returns (Todo[] memory) {
        return todos[msg.sender];
    }
}
