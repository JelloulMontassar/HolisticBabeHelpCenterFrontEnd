import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import {AuthService} from "../demo/components/auth/login/login.service";
import {MenuItem} from "primeng/api";
import {WebSocketService} from "../demo/components/dashboard/WebSocketService";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LayoutService} from "../layout/service/app.layout.service";
import {jwtDecode} from "jwt-decode";
import Swal from "sweetalert2";

@Component({
    selector: 'app-header-front',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
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
    loggedIn = false;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(private webSocketService:WebSocketService,private http: HttpClient,public layoutService: LayoutService,private  authService:AuthService, private router: Router) {


    }

    ngOnInit(): void {
        if (this.accessToken) {
            this.loggedIn = true;
        }


        this.authService.getProfile().subscribe(data => {
            this.profileData = data;
        })
    }

    logout() {
        this.authService.logOut();
        this.loggedIn = false;
        this.router.navigate(['/auth/login']);
    }
    myProfile() {
        this.router.navigate(['/user/profile']);
    }

    Forum() {
        this.router.navigate(['/forum']);
    }

    Register() {
        this.router.navigate(['/auth/login/register']);
    }

    Login() {
        this.router.navigate(['/auth/login']);
    }

    SendReclamation() {
        this.router.navigate(['/sendreclamation']);
    }

    Chat() {
        this.router.navigate(['/chat']);
    }
}
