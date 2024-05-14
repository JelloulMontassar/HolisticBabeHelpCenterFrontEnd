import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class ReclamationService {

    private accessToken = localStorage.getItem("accessToken");

    constructor(private http: HttpClient) { }
    getReclamations(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:8080/reclamations/',
            {headers: {'Authorization': `Bearer ${this.accessToken}`}});
    }
    getReclamation(id: string): Observable<any> {
        return this.http.get<any>(`http://localhost:8080/reclamations/reclamation/${id}`,
            {headers: {'Authorization': `Bearer ${this.accessToken}`}});
    }
    resolveReclamation(id: string): Observable<any> {
        return this.http.post<any>(`http://localhost:8080/reclamations/reclamation/resolve/${id}`,null,
            {headers: {'Authorization': `Bearer ${this.accessToken}`}});
    }


}
