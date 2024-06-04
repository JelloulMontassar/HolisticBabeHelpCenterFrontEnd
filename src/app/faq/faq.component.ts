import { Component, OnInit } from '@angular/core';
import { FaqService, Faq } from '../faq-admin/FaqService';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
    faqs: Faq[] = [];

    constructor(private faqService: FaqService) {}

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
}
