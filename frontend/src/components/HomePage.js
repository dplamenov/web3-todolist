import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import useContract from '../hooks/useContract'

function HomePage() {
  const [currentAccount, setCurrentAccount] = useState()
  const [provider, setProvider] = useState()
  const [signer, setSigner] = useState()
  const [todos, setTodos] = useState([]);
  const contract = useContract('TodoList');

  useEffect(() => {
    if (!window.ethereum) {
      console.log("please install MetaMask")
      return
    }

    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(result => {
        setCurrentAccount(result[0]);
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        const tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);
        
        contract.getTodos().then(setTodos);
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
      <p>Account:{currentAccount} </p>
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