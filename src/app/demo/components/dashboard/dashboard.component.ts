import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {AuthService} from "../auth/login/login.service";
import {UserService} from "./users/user.service";
import {ReclamationService} from "./reclamations/reclamtions.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    items!: MenuItem[];

    products!: Product[];
    userCount: number;
    userCountActive: number;
    reclamationCount: number;
    reclamationCountResolved: number;
    accessToken = localStorage.getItem("accessToken");
    allNotifications:any;
    reclamations:any;


    constructor(private http: HttpClient,private reclamationService:ReclamationService,private userService:UserService,private productService: ProductService, public layoutService: LayoutService,private  authService:AuthService, private router: Router) {

    }

    ngOnInit() {

        this.userService.getUsers().subscribe(data => {
            this.userCount = data.length
            this.userCountActive = data.filter(user => user.enabled).length;
        });
        this.reclamationService.getReclamations().subscribe(data => {
            this.reclamationCount = data.length
            this.reclamations = data.slice(0, 10);
            this.reclamationCountResolved = data.filter(rec => rec.result=="resolved").length;
        });
        this.getAllNotification();
        this.productService.getProductsSmall().then(data => this.products = data);

    }
    getAllNotification(){
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
        this.http.get<any[]>('http://localhost:8080/config/notifications',{headers}).subscribe(allNotifications => {
            this.allNotifications = allNotifications.slice(0, 5);
        });
    }
    viewReclamation(id) {
        this.router.navigate(['/admin/reclamations/', id]);

    }







}
