import React, {useState} from 'react';
import store from '../store'

const LoginPage = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  return (
    <div>
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
      <button onClick={() => store.login(email, password)}>Sign in</button>
    </div>
  );
};

export default LoginPage