import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaqService } from './FaqService';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-faq-admin',
    templateUrl: './faq-admin.component.html',
    styleUrls: ['./faq-admin.component.scss']
})
export class FaqAdminComponent {
    faqForm: FormGroup;

    constructor(private fb: FormBuilder, private faqService: FaqService) {
        this.faqForm = this.fb.group({
            question: ['', Validators.required],
            answer: ['', Validators.required]
        });
    }

    addFaq() {
        if (this.faqForm.valid) {
            const newFaq = this.faqForm.value;
            this.faqService.createFaq(newFaq).subscribe(
                (response) => {
                    console.log('New FAQ:', response);
                    Swal.fire({
                        title: 'Success!',
                        text: 'New FAQ has been added.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    this.faqForm.reset(); // Optionally reset the form
                },
                (error) => {
                    console.error('Error adding FAQ:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an error adding the FAQ.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            );
        } else {
            console.log('Form is invalid');
        }
    }
}
