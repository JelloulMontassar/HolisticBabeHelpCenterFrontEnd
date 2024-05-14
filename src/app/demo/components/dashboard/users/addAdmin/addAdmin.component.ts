import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {UserService} from "../user.service";
import Swal from "sweetalert2";
import {FormControl, Validators} from "@angular/forms";


@Component({
    templateUrl: './addAdmin.component.html',
})
export class AddAdminComponent implements OnInit {

    user: any;
    email = new FormControl('', [Validators.required,Validators.email]);
    password = new FormControl('', [Validators.required]);
    phoneNumber = new FormControl('', [Validators.required]);
    birthday = new FormControl('', [Validators.required]);
    lastName = new FormControl('', [Validators.required]);
    firstName = new FormControl('', [Validators.required]);

    constructor(private userService:UserService) { }

    ngOnInit() {
    }

    addAdmin() {
        if (!this.email.value||!this.password.value||!this.phoneNumber.value||!this.birthday.value||!this.lastName.value||!this.firstName.value) {
            Swal.fire({
                showConfirmButton: true,
                text: "All fields are required !",
                icon: 'error'
            });
            return null
        }
        this.user = {
            email: this.email.value,
            password: this.password.value,
            phoneNumber: this.phoneNumber.value,
            birthday: this.birthday.value,
            lastName: this.lastName.value,
            firstName: this.firstName.value
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to add this user as admin!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add as admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.userService.RegisterAdmin(this.user).subscribe(data => {
                    Swal.fire({
                        toast: true,
                        showConfirmButton: false,
                        timer: 5000,
                        position: "top-right",
                        text: data.messageResponse,
                        icon: 'success'
                    });
                });
            }
        });
    }

}
