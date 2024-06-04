import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ForumService} from "../services/forum.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
    post: any | undefined;
    commentForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private forumService: ForumService,
        private formBuilder: FormBuilder
    ) {
        this.commentForm = this.formBuilder.group({
            content: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.loadPost(id);
        });
    }

    loadPost(id: number): void {
        this.forumService.getPost(id).subscribe(post => {
            this.post = post;
            this.post.comments = this.post.comments || [];
        });
    }

    addComment(): void {
        if (this.commentForm.valid) {
            const commentContent = this.commentForm.get('content')?.value;

            this.forumService.addComment(this.post.id, commentContent).subscribe(() => {
            this.commentForm.reset();
            this.loadPost(this.post.id);
            });
        }
    }
}
