import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ForumService} from "../services/forum.service";


@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
    post: any | undefined;

    constructor(
        private route: ActivatedRoute,
        private forumService: ForumService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.loadPost(id);
        });
    }

    loadPost(id: number): void {
        this.forumService.getPost(id).subscribe(post => {
            this.post = post;
        });
    }
}
