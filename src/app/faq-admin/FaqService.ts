import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Faq {
    id?: number;
    question: string;
    answer: string;
}

@Injectable({
    providedIn: 'root'
})
export class FaqService {
    private baseUrl = 'http://localhost:8080/faqs';

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('accessToken');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    getFaqs(): Observable<Faq[]> {
        return this.http.get<Faq[]>(`${this.baseUrl}`);
    }

    getFaq(id: number): Observable<Faq> {
        return this.http.get<Faq>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
    }

    createFaq(faq: Faq): Observable<Faq> {
        return this.http.post<Faq>(this.baseUrl, faq, { headers: this.getAuthHeaders() });
    }

    updateFaq(id: number, faq: Faq): Observable<Faq> {
        return this.http.put<Faq>(`${this.baseUrl}/${id}`, faq, { headers: this.getAuthHeaders() });
    }

    deleteFaq(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
    }
}
