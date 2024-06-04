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
            categoryId: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.categoryId = this.route.snapshot.params['categoryId'];
        this.forumService.getCategory(this.categoryId).subscribe(category => {
            this.category = category;
        });

        this.refreshThreads();
    }

    refreshThreads() {
        this.forumService.getThreads().subscribe(threads => {
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
            this.forumService.createThread(threadData.title, threadData.categoryId).subscribe(
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
}
