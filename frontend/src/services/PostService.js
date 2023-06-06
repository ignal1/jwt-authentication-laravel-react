import api from "../http"

export default class PostService{
  static fetchPosts(){
    return api.get('/posts')
  }
}