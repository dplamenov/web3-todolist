const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoList", function () {
  it("should be empty", async function () {
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    expect(await todoList.getTodos()).to.deep.equal([]);
  });

  it("should add todo in list", async function () {
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    await todoList.addTodo("simple todo", "1");

    expect(await todoList.getTodos()).to.deep.equal([["simple todo", "1"]]);
  });

  it("should add todos in list", async function () {
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    await todoList.addTodo("simple todo", "2");
    await todoList.addTodo("my new todo", "3");

    expect(await todoList.getTodos()).to.deep.equal([["simple todo", "2"], ["my new todo", "3"]]);
  });

  it("should delete todos from list", async function () {
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    await todoList.addTodo("simple todo", "2");
    await todoList.addTodo("my new todo", "3");
    expect(await todoList.getTodos()).to.deep.equal([["simple todo", "2"], ["my new todo", "3"]]);

    await todoList.removeTodo(1);
    expect(await todoList.getTodos()).to.deep.equal([["simple todo", "2"]]);

    await todoList.removeTodo(0);
    expect(await todoList.getTodos()).to.deep.equal([]);
  });
});
