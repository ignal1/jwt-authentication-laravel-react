import {AxiosResponse} from "axios";
import {IPost} from "../models/IPost";
import api from "../http";

export default class PostService{
  static fetchPosts():Promise<AxiosResponse<IPost[]>>{
    return api.get<IPost[]>('/posts')
  }
}