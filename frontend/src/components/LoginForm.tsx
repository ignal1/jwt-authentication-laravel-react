import React, {FC, useState} from 'react';
import store from '../store'
import {observer} from "mobx-react-lite";

const LoginForm:FC = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

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
      <button onClick={() => store.login(email!, password!)}>Sign in</button>
    </div>
  );
};

export default observer(LoginForm)