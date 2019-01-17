import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../../models/post'
import {PostService} from '../../service/post.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit ,OnDestroy {

 posts:Post[]=[];
 private postsSub:Subscription;
  
  constructor(public postService:PostService) { }

  ngOnInit() {
    this.postService.getPost();
    this.postsSub = this.postService.getPostUpdaedListener().subscribe((posts:Post[])=>{
    this.posts=posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
