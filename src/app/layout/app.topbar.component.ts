import {Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {AuthService} from "../demo/components/auth/login/login.service";
import {Router} from "@angular/router";
import {jwtDecode} from 'jwt-decode';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WebSocketService} from "../demo/components/dashboard/WebSocketService";
import Swal from "sweetalert2";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{
    dropdownVisible = false;

    toggleDropdown() {
        this.dropdownVisible = !this.dropdownVisible;
    }
    items!: MenuItem[];
    notificationCounter: number = 0;
    notifications: any ;
    allNotifications:any;
    isDropdownVisible1 = false;
    profileData: any;
    accessToken = localStorage.getItem("accessToken");
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(private webSocketService:WebSocketService,private http: HttpClient,public layoutService: LayoutService,private  authService:AuthService, private router: Router) {


    }

    ngOnInit(): void {
        if (!this.accessToken) {
            this.router.navigate(['/auth/login']);
            return;
        }

        let decodedToken;
        try {
            decodedToken = jwtDecode(this.accessToken);
        } catch (error) {
            console.error('Error decoding token', error);
            this.router.navigate(['/auth/login']);
            return;
        }

        const currentTime = Date.now().valueOf() / 1000;
        if (decodedToken.exp < currentTime) {
            console.log('Token expired');
            this.router.navigate(['/auth/login']);
            return;
        }
        this.authService.getProfile().subscribe(data => {
            this.profileData = data;
        })
        this.getAllNotification();
        this.webSocketService.connect()
        this.webSocketService.getNotifications().subscribe((message: any) => {
            this.notifications=message;
            console.log(message);
            Swal.fire({
                toast: true,
                showConfirmButton: false,
                timer: 5000,
                position: "top-right",
                text: (this.notifications.message+" On "+this.notifications?.sendDate),
                icon: this.notifications.status=="Urgent" ? 'error' : 'warning'
            });
            const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

            this.notificationCounter += 1;
            this.http.get<any[]>('http://localhost:8080/config/notifications',{headers}).subscribe(allNotifications => {
                this.allNotifications = allNotifications;

            });

        });

    }
    openNotification(id:string) {
        console.log(id);
        this.http.post<any[]>(`http://localhost:8080/config/notifications/${id}`,null).subscribe()

    }
    toggleDropdown1() {
        this.isDropdownVisible1 = !this.isDropdownVisible1;

    }
    logout() {
        this.authService.logOut();
        this.router.navigate(['/auth/login']);
    }
    myProfile() {
        this.router.navigate(['/admin/profile']);
    }
    getAllNotification(){
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
        this.http.get<any[]>('http://localhost:8080/config/notifications',{headers}).subscribe(allNotifications => {
            this.allNotifications = allNotifications;
            this.notificationCounter += allNotifications.length;

        });
    }
}
