import { useEffect,useState } from "react";
import axios from 'axios'
import './Register.css'
export function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const user = { name, email, password };
      axios.post('http://localhost:5656/users', user)
        .then(response => {
          console.log(response.data);
          // Reset form fields
          setName('');
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          console.error(error);
        });
    }
  
    return (
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input className="form-control" type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input className="form-control" type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input className="form-control" type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>
          <button className="btn btn-primary" type="submit">Register</button>
        </form>
      );
}