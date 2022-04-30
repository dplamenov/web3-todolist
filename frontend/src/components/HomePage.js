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
   window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(result => {
        setCurrentAccount(result[0]);

        provider.getBalance(result[0])
          .then(ethers.utils.formatEther)
          .then(setBalance);
        
        contract.getTodos().then(setTodos);
        contract.getTodos().then(console.log);
      });  
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = e.target.todo.value;
    const description = e.target.description.value;

    contract.addTodo(todo, description).then(() => {
      e.target.todo.value = '';
      e.target.description.value = '';
      setTodos(todos => [...todos, {todo, description, id: todos.length, isReady: false}]);
      console.log([...todos, { todo, description, id: todos.length, isReady: false }]);
    });
  };

  const removeHandler = (id) => {
    return () => {
      contract.removeTodo(id).then(() => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
      });
    }
  }

  const markAsReady = (id) => {
    return () => {
      contract.markAsReady(id.toNumber()).then(() => {
        const todo = todos.find(todo => todo.id === id);
        setTodos(todos => {
          return [...todos.filter(todo => todo.id !== id), {...todo, isReady: true}];
        });
      });
    };
  }

  return (
    <div style={{width: "70%", margin: "0 auto"}}>
      <h1>Todo List application</h1>
      <p>Account: {currentAccount}</p>
      <p>Balance: {balance} ETH</p>
      <hr />
      <h2>Create new todo</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder='Todo' name='todo' />
        <input placeholder='Description' name='description' />
        <button>Create</button>
      </form>
      <h2>Todos</h2>
      <table style={{width: '100%', textAlign: 'center'}}>
        <thead>
          <tr>
            {/* <th>id</th> */}
            <th>Todo</th>
            <th>Description</th>
            <th>Status</th>
            <th>Mark as ready</th>
          </tr>
        </thead>
        <tbody>
          {todos.filter(todo => !todo.isReady).map((todo, key) => {
            return (
              <tr key={key}>
                {/* <td>{parseInt(todo.id)}</td> */}
                <td>{todo.todo}</td>
                <td>{todo.description}</td>
                <td>todo</td>
                <td>
                  <button onClick={markAsReady(todo.id)}>Ready</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <h2>Ready Todos</h2>
      <table style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            {/* <th>id</th> */}
            <th>Todo</th>
            <th>Description</th>
            <th>Status</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {todos.filter(todo => todo.isReady).map((todo, key) => {
            return (
              <tr key={key}>
                {/* <td>{parseInt(todo.id)}</td> */}
                <td>{todo.todo}</td>
                <td>{todo.description}</td>
                <td>ready</td>
                <td>
                  <button onClick={removeHandler(todo.id)}>X</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default HomePage;