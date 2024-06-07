import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ThreadsService } from "./ThreadsService";
import Swal from "sweetalert2";

@Component({
    selector: 'app-threads-admin',
    templateUrl: './threads-admin.component.html',
    styleUrls: ['./threads-admin.component.scss']
})
export class ThreadsAdminComponent implements OnInit {
    threads: any[] = [];
    loading: boolean = true;
    displayModal: boolean = false;
    threadForm: FormGroup;
    dialogHeader: string;
    thread: any;

    constructor(private threadsService: ThreadsService, private fb: FormBuilder) {
        this.threadForm = this.fb.group({
            id: [''],
            title: [''],
            author: [{ value: '', disabled: true }],
            postIds: ['']
        });
    }

    ngOnInit() {
        this.fetchThreads();
    }

    fetchThreads() {
        this.threadsService.getThreads().subscribe((data: any[]) => {
            this.threads = data;
            this.loading = false;
        });
    }

    addThread() {
        this.dialogHeader = 'Add Thread';
        this.threadForm.reset(); // Reset the form
        this.displayModal = true;
    }

    viewThread(thread: any) {
        this.dialogHeader = 'Edit Thread';
        this.thread = thread;
        this.threadForm.patchValue({
            id: thread.id,
            title: thread.title,
            author: thread.author.lastName,
            postIds: thread.postIds
        });

        this.displayModal = true;
    }

    onSave() {
        if (this.threadForm.value.id) {
            this.threadsService.updateThread(this.threadForm.value.id, this.threadForm.value).subscribe(
                response => {
                    this.fetchThreads();
                    this.displayModal = false;
                    Swal.fire('Success', 'Thread updated successfully!', 'success');
                },
                error => {
                    Swal.fire('Error', 'There was an error updating the thread.', 'error');
                }
            );
        } else {
            // Handle add thread logic here
            this.displayModal = false;
            Swal.fire('Info', 'Add thread functionality is not implemented.', 'info');
        }
    }

    DeleteThread(thread: any) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this thread?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                this.threadsService.deleteThread(thread.id).subscribe(() => {
                    this.fetchThreads();
                Swal.fire('Deleted!', 'The thread has been deleted.', 'success');})

            }
        });

    }
}
