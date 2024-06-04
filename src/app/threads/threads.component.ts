import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-threads',
    templateUrl: './threads.component.html',
    styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
    threads: any[] = [];
    categories: any[] = [];
    loading: boolean = true;
    displayModal: boolean = false;
    selectedCategory: any = null;
    threadForm: FormGroup;
    category: any;
    categoryId: number;
    constructor(private forumService: ForumService, private fb: FormBuilder, public router: Router, private route: ActivatedRoute) {
        this.threadForm = this.fb.group({
            title: ['', Validators.required],

        });
    }

    ngOnInit(): void {
        this.categoryId = this.route.snapshot.params['categoryId'];
        this.forumService.getThreads(this.categoryId).subscribe(threads => {
            this.threads = threads;
            this.loading = false
        });
        this.refreshThreads();
    }

    refreshThreads() {

        this.forumService.getThreads(this.categoryId).subscribe(threads => {
            this.threads = threads;
        });
    }


    addThread() {
        this.threadForm.reset();
        this.displayModal = true;
    }

    onSave() {
        if (this.threadForm.valid) {
            const threadData = this.threadForm.value;
            this.forumService.createThread(threadData.title, this.categoryId).subscribe(
                () => {
                    this.displayModal = false;
                    this.refreshThreads();
                    Swal.fire('Success', 'Thread created successfully!', 'success');
                },
                (error) => {
                    Swal.fire('Error', 'Failed to create thread.', 'error');
                }
            );
        }
    }

    getThreadPosts(threadId: number) {
        this.router.navigate(['/forum/thread/posts/',threadId]);
    }
}
