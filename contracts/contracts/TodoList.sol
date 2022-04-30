//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TodoList {
    struct Todo {
        uint256 id;
        string todo;
        string description;
        bool isReady;
    }

    mapping(address => Todo[]) todos;
    uint256 count = 0;

    function addTodo(string memory _todo, string memory _description)
        public
        returns (Todo memory)
    {
        Todo memory todo = Todo(count++, _todo, _description, false);
        todos[msg.sender].push(todo);
        return todos[msg.sender][todos[msg.sender].length - 1];
    }

    function getTodos() public view returns (Todo[] memory) {
        return todos[msg.sender];
    }

    function removeTodo(uint256 _id) public returns (Todo[] memory) {
        for (uint256 i; i < todos[msg.sender].length; i++) {
            Todo storage todo = todos[msg.sender][i];
            if (todo.id == _id) {
                todo = todos[msg.sender][todos[msg.sender].length - 1];
                todos[msg.sender].pop();
            }
        }
        return todos[msg.sender];
    }

    function editTodo(
        uint256 _id,
        string memory _todo,
        string memory _description,
        bool isReady
    ) public returns (Todo memory) {
        todos[msg.sender][_id] = Todo(count++, _todo, _description, isReady);
        return todos[msg.sender][_id];
    }

    function markAsReady(uint256 _id) public returns (Todo memory todo) {
        for (uint256 i; i < todos[msg.sender].length; i++) {
            if (todos[msg.sender][i].id == _id) {
                todos[msg.sender][i].isReady = true;
                return todos[msg.sender][i];
            }
        }
    }
}
