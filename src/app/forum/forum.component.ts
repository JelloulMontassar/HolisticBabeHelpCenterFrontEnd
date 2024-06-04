import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-forums',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.scss']
})
export class ForumsComponent implements OnInit {
    forums: any[] = [];
    filteredForums: any[] = [];
    searchQuery: string = '';

    constructor(private forumService: ForumService, public router: Router) { }

    ngOnInit(): void {
        this.forumService.getCategories().subscribe(forums => {
            this.forums = forums;
            this.filteredForums = forums;
        });
    }
    getCategory(categoryId: number): any {
        this.router.navigate(['/forum/threads/', categoryId]);
    }
    filterForums(): void {
        this.filteredForums = this.forums.filter(forum =>
            forum.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            forum.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }
}
