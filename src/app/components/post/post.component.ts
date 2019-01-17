import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import {PostService} from '../../service/post.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  constructor(public postService:PostService) { }

  ngOnInit() {
  }
onAddPost(form:NgForm){
  if(form.invalid){
    return;
  }
  
  this.postService.addPost(form.value.title,form.value.content);
  form.resetForm();
}

}
