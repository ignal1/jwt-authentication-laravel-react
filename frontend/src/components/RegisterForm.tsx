import React, {FC, useState} from 'react';
import store from '../store'

const RegisterForm:FC = () => {
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

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
      <button onClick={() => store.register(name!, email!, password!)}>Register</button>
    </div>
  );
};

export default RegisterForm;