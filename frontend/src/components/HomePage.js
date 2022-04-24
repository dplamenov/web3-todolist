import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import useContract from '../hooks/useContract'
import useProvider from '../hooks/useProvider'

function HomePage() {
  const [currentAccount, setCurrentAccount] = useState()
  const provider = useProvider()
  const contract = useContract('TodoList');
  const [todos, setTodos] = useState([]);
  const [balance, setBalance] = useState();


  useEffect(() => {
    if (!window.ethereum) {
      console.log("please install MetaMask")
      return
    }

    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(result => {
        setCurrentAccount(result[0]);
        contract.getTodos().then(setTodos);
        provider.getBalance(result[0]).then(ethers.utils.formatEther).then(setBalance);
      });  
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.todo.value;

    contract.addTodo(value).then(_ => {
      e.target.todo.value = '';
      setTodos(todos => [...todos, {todo: value}]);
    });
  };

  return (
    <div style={{width: "70%", margin: "0 auto"}}>
      <h1>Todo List application</h1>
      <p>Account: {currentAccount}</p>
      <p>Balance: {balance} ETH</p>
      <hr />
      <h2>Todos</h2>
      {todos.map((todo, key) => {
        return <p key={key}>{todo.todo}</p>
      })}
      <form onSubmit={handleSubmit}>
        <input placeholder='Todo' name='todo' />
        <button>Create</button>
      </form>
    </div>
  )
}

export default HomePage;