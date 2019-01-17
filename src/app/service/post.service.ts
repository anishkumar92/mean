import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {Post} from '../models/post'; 
@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts:Post[]= [];
  private postsUpdated = new Subject<Post[]>();

  constructor() { }

  getPost(){
    return [...this.posts];
  }
  getPostUpdaedListener(){
    return this.postsUpdated.asObservable();
  }
  addPost(title:string,content:string){
    const post:Post ={title:title,content:content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
