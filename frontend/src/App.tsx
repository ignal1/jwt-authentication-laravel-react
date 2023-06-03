import React, {FC, useEffect} from 'react';
import LoginForm from "./components/LoginForm";
import store from './store'
import {observer} from "mobx-react-lite";

const App:FC = () => {
  useEffect(() => {
    if(localStorage.getItem('token')){
      store.refresh()
    }
  }, [])

  return (
    <div className="App">
      <h2>{store.isAuth ? `Пользователь ${store.user.name} авторизован` : 'Авторизуйтесь'}</h2>
      <LoginForm />
    </div>
  )
}

export default observer(App)
