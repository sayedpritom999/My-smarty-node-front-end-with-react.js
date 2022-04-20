import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser);
        console.log(newUser);
      })
      // .catch(err => console.error("Error:",   err))
  }


  return (
    <div className="App">
      <h1>My own app: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='Name' required />
        <input type="email" name="email" placeholder='Email' required />
        <input type="submit" value="Add user" />
      </form>
      <ul>
        {users.map(user => <li key={user.id}>{user.id} {user.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
