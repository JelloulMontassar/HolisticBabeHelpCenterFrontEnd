import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ForumService {
    private baseUrl = 'http://localhost:8080/forum';

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const accessToken = localStorage.getItem('accessToken');
        return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    }

    getCategories(): Observable<any[]> {
        const headers = this.getAuthHeaders();
        return this.http.get<any[]>(`${this.baseUrl}/categories`, { headers });
    }
    getCategory(categoryId: number): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${this.baseUrl}/categories/${categoryId}`, { headers });
    }
    updateCategory(category: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.put<any>(`${this.baseUrl}/categories`, category, { headers });
    }

    createCategory(name: string): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(`${this.baseUrl}/categories`, null, {
            headers,
            params: { name }
        });
    }

    getThreads(): Observable<any[]> {
        const headers = this.getAuthHeaders();
        return this.http.get<any[]>(`${this.baseUrl}/threads`, { headers });
    }

    createThread(title: string, categoryId: number): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(`${this.baseUrl}/threads`, { title, categoryId }, { headers });
    }

    createPost(threadId: number, content: string): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(`${this.baseUrl}/posts`, { threadId, content}, { headers });
    }
    getPosts(threadId: number): Observable<any[]> {
        const headers = this.getAuthHeaders();
        return this.http.get<any[]>(`${this.baseUrl}/threads/${threadId}/posts`, { headers });
    }
}
