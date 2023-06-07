import axios from 'axios'
import store from "../store";

export const API_URL = 'http://localhost:8000/api'

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
  if(error.response.status === 401 && error.config && !error.config._isRetry){
    originalRequest._isRetry = true
    try{
      await store.refresh()
      return api.request(originalRequest)
    } catch(e){
      console.log('Не авторизован')
    }
  }
  throw error
})

export default api;