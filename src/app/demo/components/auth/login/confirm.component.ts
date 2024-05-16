import {Component, OnInit} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {AuthService} from "./login.service";
import Swal from "sweetalert2";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './confirm.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],


})
export class ConfirmComponent implements OnInit{
    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('email');
        this.email.setValue(id);
    }

    email = new FormControl('', [Validators.required,Validators.email]);
    resetToken = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    constructor(private route: ActivatedRoute,public layoutService: LayoutService,private authService: AuthService, private router: Router) { }
    onReset() {
        console.log(this.email.value)
        if (!this.email.value||!this.resetToken.value||!this.password.value) {
            Swal.fire({
                showConfirmButton: true,
                text: "All fields are required !",
                icon: 'error'
            });
            return null
        }
        else {
            const confirm = {
                email: this.email.value,
                resetToken: this.resetToken.value,
                newPassword: this.password.value
            }
            this.authService.ConfirmResetPassword(confirm).subscribe(
                data => {
                    new Promise((resolve) => {
                        resolve(true);
                    }).then(() => {
                        Swal.fire({
                            toast: true,
                            showConfirmButton: false,
                            timer: 5000,
                            position: "top-right",
                            text: data.messageResponse,
                            icon: 'success'
                        });
                        this.router.navigate(['/auth/login/']);
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

}
