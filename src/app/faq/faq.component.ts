import { Component, OnInit } from '@angular/core';
import { FaqService, Faq } from '../faq-admin/FaqService';
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
    faqs: Faq[] = [];

    constructor(private faqService: FaqService, public router: Router ) {}

    ngOnInit(): void {
        this.loadFaqs();
    }

    loadFaqs(): void {
        this.faqService.getFaqs().subscribe(
            (data: Faq[]) => {
                this.faqs = data;
            },
            (error) => {
                console.error('Error fetching FAQs', error);
            }
        );
    }

    AskAQuestion() {
        if (localStorage.getItem('accessToken')) {
            this.router.navigate(['/forum']);
        } else {
            Swal.fire({
                title: "Not Logged In",
                text: "You need to be logged in to ask a question. Would you like to login or register?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel',
                showDenyButton: true,
                denyButtonText: `Register`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.router.navigate(['/auth/login']);
                } else if (result.isDenied) {
                    this.router.navigate(['/auth/login/register']);
                }
            });
        }
    }
}
