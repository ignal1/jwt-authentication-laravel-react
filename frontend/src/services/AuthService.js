import api from "../http"

export class AuthService{
  static async login(email, password){
    return api.post('/auth/login', {email, password})
  }

  static async refresh(){
    return api.post('/auth/refresh')
  }

  static async register(name, email, password){
    return api.post('/auth/register(', {name, email, password})
  }

  static async logout(){
    return api.post('/auth/logout')
  }
}
