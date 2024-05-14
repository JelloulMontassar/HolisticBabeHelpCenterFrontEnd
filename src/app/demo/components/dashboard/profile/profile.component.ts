import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../users/user.service";
import Swal from "sweetalert2";
import {FormControl, Validators} from "@angular/forms";


@Component({
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;

    onFileSelected(event) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => this.user.profileImage = reader.result as string;
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('file', file);

            this.userService.updateProfilePicture(formData).subscribe(data => {
                Swal.fire('Success', 'Profile picture updated', 'success');
                this.getUser();
            }, error => {
                Swal.fire('Error', 'Profile picture not updated', 'error');
            });
        }
    }
    user: any;
    email = new FormControl('', [Validators.required,Validators.email]);
    password = new FormControl('', [Validators.required]);
    phoneNumber = new FormControl('', [Validators.required]);
    birthday = new FormControl('', [Validators.required]);
    lastName = new FormControl('', [Validators.required]);
    firstName = new FormControl('', [Validators.required]);

    constructor(private userService:UserService) { }

    ngOnInit() {
        this.getUser()
    }
    getUser() {
        this.userService.getProfile().subscribe(data => {
            this.user = data;
            this.email.setValue(this.user.email);
            this.phoneNumber.setValue(this.user.phoneNumber);
            let date = new Date(this.user.birthday);
            let formattedDate = date.toISOString().split('T')[0];
            this.birthday.setValue(formattedDate);
            this.lastName.setValue(this.user.lastName);
            this.firstName.setValue(this.user.firstName);
        });
    }
    updateUser() {
        let user = {
            phoneNumber: this.phoneNumber.value,
            birthday: this.birthday.value,
            lastName: this.lastName.value,
            firstName: this.firstName.value
        }
        this.userService.updateProfile(user).subscribe(data => {
            Swal.fire('Success', 'Profile updated', 'success');
            this.getUser();
        });
    }


}
