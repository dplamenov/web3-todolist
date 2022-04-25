//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TodoList {
    struct Todo {
        string todo;
        string description;
    }

    mapping(address => Todo[]) todos;

    function addTodo(string memory _todo, string memory _description)
        public
        returns (Todo memory)
    {
        Todo memory todo = Todo(_todo, _description);
        todos[msg.sender].push(todo);
        return todo;
    }

    function getTodos() public view returns (Todo[] memory) {
        return todos[msg.sender];
    }

    function removeTodo(uint256 _id) public returns (Todo[] memory) {
        todos[msg.sender][_id] = todos[msg.sender][
            todos[msg.sender].length - 1
        ];
        todos[msg.sender].pop();
        return todos[msg.sender];
    }
}
