import axios from 'axios'
import store from "../store";

export const API_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_URL
})

api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
  return config
})

api.interceptors.response.use(config => {
  return config
}, async error => {
  const originalRequest = error.config
  if(error.status === 401){
    try{
      await store.refresh()
      return api.request(originalRequest)
    } catch(e){
      console.log('Не авторизован')
    }
  }
})

export default api;