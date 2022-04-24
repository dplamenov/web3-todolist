import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import TodoListABI from '../abi/TodoList.json'

function HomePage() {
  const [currentAccount, setCurrentAccount] = useState()
  const [provider, setProvider] = useState()
  const [signer, setSigner] = useState()
  const [todos, setTodos] = useState([]);

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
        
        const contract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', TodoListABI, tempSigner);
        // contract.addTodo("1").then(todo => {
        //   console.log(todo);
        // });

        contract.getTodos().then(setTodos);
      });  
  }, [])


  return (
    <div style={{width: "70%", margin: "0 auto"}}>
      <h1>Todo List application</h1>
      <p>Account:{currentAccount} </p>
      <hr />
      <h2>Todos</h2>
      {todos.map((todo, key) => {
        return <p key={key}>{todo.todo}</p>
      })}
    </div>
  )
}

export default HomePage;