import {useState,useEffect} from 'react'
export function ShowUsers(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5656/users')
        .then(response => response.json())
        .then(data => setUsers(data));
    }, []);
  
    return (
      <div>
        <h2>User List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} ({user.email})</li>
          ))}
        </ul>
      </div>
    );
}