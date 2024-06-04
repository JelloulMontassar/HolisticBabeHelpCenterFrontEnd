import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {LayoutService} from "../layout/service/app.layout.service";
import {Router} from "@angular/router";
import {AppModule} from "../app.module";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    constructor(public layoutService: LayoutService, public router: Router) { }
    Login() {
        this.router.navigate(['/auth/login']);

    }
    SignUp() {
        this.router.navigate(['/auth/signup']);
    }
    Forum(){
        this.router.navigate(['/forum']);
    }
}
