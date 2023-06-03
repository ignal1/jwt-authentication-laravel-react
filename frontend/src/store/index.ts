import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import {AuthService} from "../services/AuthService";

class Store{
  user = {} as IUser
  isAuth = false

  constructor(){
    makeAutoObservable(this)
  }

  setAuth(bool:boolean){
    this.isAuth = bool
  }

  setUser(user:IUser){
    this.user = user
  }

  async login(email:string, password:string){
    try{
      const response = await AuthService.login(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(Store.makeUser(response.data.accessToken))
    } catch(e:any) {
      console.log(e.response?.data?.error)
    }
  }

  async refresh(){
    try{
      const response = await AuthService.refresh()
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(Store.makeUser(response.data.accessToken))
    } catch(e:any) {
      console.log(e.response?.data?.error)
    }
  }

  async register(name:string, email:string, password:string){
    try{
      const response = await AuthService.register(name, email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(Store.makeUser(response.data.accessToken))
    } catch(e:any) {
      console.log(e.response?.data?.error)
    }
  }

  async logout(){
    try{
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch(e:any) {
      console.log(e.response?.data?.error)
    }
  }

  private static makeUser(token:string):IUser{
    const tokenBinary = JSON.parse(atob(token.split('.')[1])) as IUser
    return {
      id: tokenBinary.id,
      name: tokenBinary.name,
      email: tokenBinary.email
    }
  }
}

export default new Store()