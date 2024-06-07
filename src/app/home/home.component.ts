import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {LayoutService} from "../layout/service/app.layout.service";
import {Router} from "@angular/router";
import {AppModule} from "../app.module";
import {ForumService} from "../services/forum.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements  OnInit{
    categories: any[];
    constructor(public layoutService: LayoutService, public router: Router,private categoryService: ForumService, ) { }
    searchQuery: string = '';
    loggedIn: boolean = false;
    searchArticles() {
        console.log('Searching for articles with query:', this.searchQuery);
    }
    Login() {
        this.router.navigate(['/auth/login']);

    }
    SignUp() {
        this.router.navigate(['/auth/signup']);
    }

    Forum(){
        this.router.navigate(['/forum']);
    }
    Faq(){
        this.router.navigate(['/faq']);
    }
    ngOnInit() {
        if (localStorage.getItem('accessToken')) {
            this.loggedIn = true;
            this.fetchCategories();
        }


    }

    fetchCategories() {
        this.categoryService.getCategories().subscribe((data: any[]) => {
            this.categories = data;
        });
    }
}
