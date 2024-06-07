import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThreadsService {
    private apiUrl = 'http://localhost:8080/forum/threads';

    constructor(private http: HttpClient) {}

    getThreads(): Observable<any[]> {
        const token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<any[]>(this.apiUrl, { headers });
    }
    updateThread(id: number, thread: any): Observable<any> {
        const token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.put<any>(`${this.apiUrl}/${id}/update`, thread, { headers });
    }

    deleteThread(id:number) {
        const token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
    }
}
