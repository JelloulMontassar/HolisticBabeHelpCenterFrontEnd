import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    @Input() threadId!: number;
    posts: any[] = [];
    loading: boolean = true;
    postForm: FormGroup;

    constructor(private forumService: ForumService, private fb: FormBuilder) {
        this.postForm = this.fb.group({
            content: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.refreshPosts();
    }

    refreshPosts() {
        this.forumService.getPosts(this.threadId).subscribe(posts => {
            this.posts = posts;
            this.loading = false;
        });
    }

    addPost() {
        if (this.postForm.valid) {
            const postData = this.postForm.value;
            this.forumService.createPost(this.threadId, postData.content).subscribe(
                () => {
                    this.postForm.reset();
                    this.refreshPosts();
                    Swal.fire('Success', 'Post added successfully!', 'success');
                },
                (error) => {
                    Swal.fire('Error', 'Failed to add post.', 'error');
                }
            );
        }
    }
}
