import {Component, CUSTOM_ELEMENTS_SCHEMA, HostListener} from '@angular/core';
import {LayoutService} from "../layout/service/app.layout.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header-front',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    menuVisible: boolean = false;
    loggedIn = false;
    constructor(private router: Router) {}
    ngOnInit() {
        if (sessionStorage.getItem("accessToken")) {
            this.loggedIn = true;
        }
    }
    toggleMenu() {
        this.menuVisible = !this.menuVisible;
    }

    Login() {
        this.router.navigate(['/auth/login']);
    }

    Forum() {
        this.router.navigate(['/forum']);
    }

    Register() {
        this.router.navigate(['/auth/login/register']);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        if (!this.menuVisible) {
            return;
        }

        const targetElement = event.target as HTMLElement;
        if (!targetElement.closest('.header')) {
            this.menuVisible = false;
        }
    }
}
