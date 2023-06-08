import React, {useEffect, useState} from 'react'
import {observer} from "mobx-react-lite"
import store from './store'
import PostService from "./services/PostService"
import LoginPage from "./components/LoginPage"
import { Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout"
import RegisterPage from "./components/RegisterPage";
import Posts from "./components/Posts";
import NotfoundPage from "./components/NotfoundPage";

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
        <LoginPage />
        <div>
          <button onClick={getPosts}>Получить посты</button>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="posts" element={<Posts />} />
        <Route path="*" element={<NotfoundPage />} />
      </Route>
    </Routes>




        // <h2>{store.isAuth ? `Пользователь ${store.user.name} авторизован` : 'Авторизуйтесь'}</h2>
        // <button onClick={() => store.logout()}>Выйти</button>
        // <div>
        //   <button onClick={getPosts}>Получить посты</button>
        // </div>
        // {
        //   posts.map(post =>
        //     <div key={post.title}>{post.content}</div>
        //   )
        // }


  )
}

export default observer(App)
