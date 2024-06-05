import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {AuthService} from "./login.service";
import Swal from "sweetalert2";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],


})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    email = new FormControl('', [Validators.required,Validators.email]);
    password = new FormControl('', [Validators.required]);
    constructor(public layoutService: LayoutService,private authService: AuthService, private router: Router) { }


    onLogin() {
        console.log(this.email.value);
        console.log(this.password.value);
        if (!this.email.value || !this.password.value) {
            Swal.fire({
                showConfirmButton: true,
                text: "All fields are required!",
                icon: 'error'
            });
            return null;
        } else {
            this.authService.login(this.email.value, this.password.value).subscribe(
                data => {
                    new Promise((resolve) => {
                        localStorage.setItem("accessToken", data.token);
                        resolve(true);
                    }).then(() => {
                        const decodedToken: any = this.decodeJwt(data.token);
                        const userRole = decodedToken.role;

                        Swal.fire({
                            toast: true,
                            showConfirmButton: false,
                            timer: 5000,
                            position: "top-right",
                            text: data.messageResponse,
                            icon: 'success'
                        });

                        if (userRole === 'ROLE_ADMIN') {
                            this.router.navigate(['/admin']);
                        } else if (userRole === 'ROLE_USER') {
                            this.router.navigate(['/home']);
                        } else {
                            Swal.fire({
                                toast: true,
                                showConfirmButton: false,
                                timer: 3000,
                                position: "top-right",
                                text: 'Unknown user role!',
                                icon: 'error'
                            });
                        }
                    });
                },
                error => {
                    Swal.fire({
                        toast: true,
                        showConfirmButton: false,
                        timer: 3000,
                        position: "top-right",
                        text: error,
                        icon: 'error'
                    });
                }
            );
        }
    }

    decodeJwt(token: string): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

}
