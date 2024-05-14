import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private loginUrl = 'http://localhost:8080/user/auth';
    private accessToken = localStorage.getItem("accessToken");

    constructor(private http: HttpClient) { }
    logOut() {
        this.http.get('http://localhost:8080/user/logout', {headers: {'Authorization': `Bearer ${this.accessToken}`}, responseType: 'text'}).subscribe(
            response => {
                localStorage.clear();
                Swal.fire({
                    toast: true,
                    showConfirmButton: false,
                    timer: 5000,
                    position: "top-right",
                    text: response,
                    icon: 'success'
                });
            },
            error => {
                console.error(error);
            }
        );
    }
    getProfile(): Observable<any> {
        return new Observable(subscriber => {
            const intervalId = setInterval(() => {
                this.accessToken = localStorage.getItem("accessToken");
                if (this.accessToken) {
                    clearInterval(intervalId);
                    subscriber.next(this.accessToken);
                    subscriber.complete();
                }
            }, 100);
        }).pipe(
            switchMap(token => {
                return this.http.get('http://localhost:8080/profile/getProfile', {headers: {'Authorization': `Bearer ${token}`}})
            }),
            catchError(this.handleError)
        );
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(this.loginUrl, { email, password })
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, body was: ${error.error.messageResponse}`);
        }
        return throwError('Something bad happened; please try again later.');
    }
}
