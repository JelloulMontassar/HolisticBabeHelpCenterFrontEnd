import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private accessToken = localStorage.getItem("accessToken");

    constructor(private http: HttpClient) { }
    getUsers(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:8080/config/getAllUsers',
            {headers: {'Authorization': `Bearer ${this.accessToken}`}});
    }
    activateUser(id: string): Observable<any> {
        return this.http.put<any>(`http://localhost:8080/config/enableAccount/${id}`,null,
            {headers: {'Authorization': `Bearer ${this.accessToken}`}});
    }
    deactivateUser(id: string): Observable<any> {
        return this.http.put<any>(`http://localhost:8080/config/disableAccount/${id}`,null,
            {headers: {'Authorization': `Bearer ${this.accessToken}`}});
    }
    RegisterAdmin(user: any): Observable<any> {
        return this.http.post<any>(`http://localhost:8080/config/registerAdmin`,user,
            {headers: {'Authorization': `Bearer ${this.accessToken}`}});
    }
    getProfile(): Observable<any> {
        return this.http.get<any>(`http://localhost:8080/profile/getProfile`,
            {headers: {'Authorization': `Bearer ${this.accessToken}`}});
    }

    updateProfile(user: any): Observable<any> {
        return this.http.put<any>(`http://localhost:8080/profile/updateProfile`,user,
            {headers: {'Authorization': `Bearer ${this.accessToken}`}});

    }
    updateProfilePicture(formData: FormData): Observable<any> {
        return this.http.put<any>(`http://localhost:8080/profile/upload-image`, formData,
            {headers: {'Authorization': `Bearer ${this.accessToken}`}});
    }
}
