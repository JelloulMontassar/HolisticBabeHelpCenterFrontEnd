import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaqService, Faq } from './FaqService';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-faq-admin',
    templateUrl: './faq-admin.component.html',
    styleUrls: ['./faq-admin.component.scss']
})
export class FaqAdminComponent implements OnInit {
    faqForm: FormGroup;
    faqs: Faq[] = [];
    loading: boolean = true;
    displayModal: boolean = false;
    dialogHeader: string = '';
    currentFaq: Faq | null = null;

    constructor(private fb: FormBuilder, private faqService: FaqService) {
        this.faqForm = this.fb.group({
            id: [''],
            question: ['', Validators.required],
            answer: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.fetchFaqs();
    }

    fetchFaqs() {
        this.faqService.getFaqs().subscribe((data: Faq[]) => {
            this.faqs = data;
            this.loading = false;
        });
    }

    addFaq() {
        this.dialogHeader = 'Add FAQ';
        this.faqForm.reset();
        this.displayModal = true;
    }

    editFaq(faq: Faq) {
        this.dialogHeader = 'Edit FAQ';
        this.currentFaq = faq;
        this.faqForm.patchValue(faq);
        this.displayModal = true;
    }

    deleteFaq(faq: Faq) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this FAQ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                this.faqService.deleteFaq(faq.id!).subscribe(() => {
                    this.fetchFaqs();
                    Swal.fire('Deleted!', 'The FAQ has been deleted.', 'success');
                });
            }
        });
    }

    onSave() {
        if (this.faqForm.valid) {
            const faq = this.faqForm.value;
            if (faq.id) {
                this.faqService.updateFaq(faq.id, faq).subscribe(
                    response => {
                        this.fetchFaqs();
                        this.displayModal = false;
                        Swal.fire('Success', 'FAQ updated successfully!', 'success');
                    },
                    error => {
                        Swal.fire('Error', 'There was an error updating the FAQ.', 'error');
                    }
                );
            } else {
                this.faqService.createFaq(faq).subscribe(
                    response => {
                        this.fetchFaqs();
                        this.displayModal = false;
                        Swal.fire('Success', 'New FAQ has been added.', 'success');
                    },
                    error => {
                        Swal.fire('Error', 'There was an error adding the FAQ.', 'error');
                    }
                );
            }
        } else {
            Swal.fire('Error', 'Please fill in all required fields.', 'error');
        }
    }
}
