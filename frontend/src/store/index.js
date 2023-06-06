import {makeAutoObservable} from "mobx";
import {AuthService} from "../services/AuthService";

class Store{
  user = {}
  isAuth = false
  isLoading = false

  constructor(){
    makeAutoObservable(this)
  }

  setAuth(bool){
    this.isAuth = bool
  }

  setUser(user){
    this.user = user
  }

  setLoading(bool){
    this.isLoading = bool
  }

  async login(email, password){
    try{
      const response = await AuthService.login(email, password)
      sessionStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(Store.makeUser(response.data.accessToken))
    } catch(e) {
      console.log(e.response?.data?.error)
    }
  }

  async refresh(){
    this.setLoading(true)
    try{
      const response = await AuthService.refresh()
      sessionStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(Store.makeUser(response.data.accessToken))
    } catch(e) {
      console.log(e.response?.data?.error)
    } finally {
      this.setLoading(false)
    }
  }

  async register(name, email, password){
    try{
      const response = await AuthService.register(name, email, password)
      sessionStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(Store.makeUser(response.data.accessToken))
    } catch(e) {
      console.log(e.response?.data?.error)
    }
  }

  async logout(){
    try{
      const response = await AuthService.logout()
      sessionStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({})
    } catch(e) {
      console.log(e.response?.data?.error)
    }
  }

  static makeUser(token){
    const tokenBinary = JSON.parse(atob(token.split('.')[1]))
    return {
      id: tokenBinary.id,
      name: tokenBinary.name,
      email: tokenBinary.email
    }
  }
}

export default new Store()