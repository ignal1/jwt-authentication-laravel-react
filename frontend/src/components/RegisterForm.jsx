import React, {useState} from 'react';
import store from '../store'

const RegisterForm = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  return (
    <div>
      <input
        onChange={e => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Name" />
      <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email" />
      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="text"
        placeholder="Password" />
      <button onClick={() => store.register(name, email, password)}>Register</button>
    </div>
  );
};

export default RegisterForm;