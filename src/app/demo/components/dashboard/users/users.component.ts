import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Customer, Representative} from "../../../api/customer";
import {Product} from "../../../api/product";
import {CustomerService} from "../../../service/customer.service";
import {ProductService} from "../../../service/product.service";
import {Table} from "primeng/table";
import {UserService} from "./user.service";
import Swal from "sweetalert2";


@Component({
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

    users: any[] = [];
    statuses: any[] = [];
    products: Product[] = [];
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private userService:UserService) { }

    ngOnInit() {
        this.fetchUsers()
    }
    fetchUsers(){
        this.userService.getUsers().subscribe(users => {
            this.users = users;
            this.loading = false;
        });
    }
    activate(user: any) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to activate this user account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, activate it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.userService.activateUser(user.userId).subscribe(data => {
                    this.fetchUsers();
                    Swal.fire({
                        toast: true,
                        showConfirmButton: false,
                        timer: 5000,
                        position: "top-right",
                        text: data.message,
                        icon: 'success'
                    });
                });
            }
        });
    }
    deactivate(user: any) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to deactivate this user account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, deactivate it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.userService.deactivateUser(user.userId).subscribe(data => {
                    this.fetchUsers();
                    Swal.fire({
                        toast: true,
                        showConfirmButton: false,
                        timer: 5000,
                        position: "top-right",
                        text: data.message,
                        icon: 'success'
                    });
                });
            }
        });
    }






    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

}
