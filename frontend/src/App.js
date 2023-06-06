import React, {useEffect, useState} from 'react'
import {observer} from "mobx-react-lite";
import store from './store'
import PostService from "./services/PostService";
import LoginForm from "./components/LoginForm";

function App(){
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      store.refresh()
    }
  }, [])

  async function getPosts() {
    try {
      const response = await PostService.fetchPosts()
      setPosts(response.data.data)
    } catch (e) {
      console.log(e);
    }
  }

  if(store.isLoading){
    return(
      <div>Loading...</div>
    )
  }

  if(!store.isAuth){
    return(
      <div>
        <LoginForm />
        <div>
          <button onClick={getPosts}>Получить посты</button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <h2>{store.isAuth ? `Пользователь ${store.user.name} авторизован` : 'Авторизуйтесь'}</h2>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getPosts}>Получить посты</button>
      </div>
      {
        posts.map(post =>
          <div key={post.title}>{post.content}</div>
        )
      }
    </div>
  )
}

export default observer(App)
