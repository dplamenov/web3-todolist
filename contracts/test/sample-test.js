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

    await todoList.addTodo("simple todo");

    expect(await todoList.getTodos()).to.deep.equal([["simple todo"]]);
  });

  it("should add todos in list", async function () {
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    await todoList.addTodo("simple todo");
    await todoList.addTodo("my new todo");

    expect(await todoList.getTodos()).to.deep.equal([["simple todo"], ["my new todo"]]);
  });
});
