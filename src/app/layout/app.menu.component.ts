import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] }
                ]
            },
            {
                label: 'MANAGE USERS',
                items: [

                    { label: 'USERS', icon: 'pi pi-fw pi-user', routerLink: ['/admin/users'] },
                    { label: 'ADD ADMIN', icon: 'pi pi-fw pi-plus', routerLink: ['/admin/users/addAdmin'] },
                ]
            },
            {
                label: 'MANAGE RECLAMATIONS',
                items: [

                    { label: 'RECLAMATIONS', icon: 'pi pi-flag-fill', routerLink: ['/admin/reclamations'] },
                ]
            },

        ];
    }
}
