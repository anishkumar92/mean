import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {Post} from '../models/post'; 
import { HttpClient } from '@angular/common/http';

import{map} from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts:any;
  private postsUpdated = new Subject<Post[]>();

  constructor(private http:HttpClient) { }

  getPost(){
    this.http
    .get<{message:string,posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      return postData.posts.map(post=>{
       
        return {
          title:post.title,
          content:post.content,
          id:post._id
         
        };
      });
    })) 
    .subscribe((postData)=>{
      this.posts=postData;
      this.postsUpdated.next([...this.posts]);
    });
  }
  getPostUpdaedListener(){
    return this.postsUpdated.asObservable();
  }
  addPost(title:string,content:string){
    const post:Post ={id:null,title:title,content:content};

    this.http
    .post<{message:string}>("http://localhost:3000/api/posts",post).subscribe((responseData)=>{
      
          this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
    });


  }
}
