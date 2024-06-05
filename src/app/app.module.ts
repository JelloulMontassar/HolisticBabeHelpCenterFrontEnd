import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {SendreclamationComponent} from "./demo/components/sendreclamation/sendreclamation.component";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FileUploadModule} from "primeng/fileupload";
import {CategoriesComponent} from "./categories/categories.component";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import { ReactiveFormsModule } from '@angular/forms';
import {ThreadsComponent} from "./threads/threads.component";
import {PostsComponent} from "./posts/posts.component";

import { InputTextModule } from 'primeng/inputtext';
import {ForumsComponent} from "./forum/forum.component";
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {PostDetailsComponent} from "./post-details/post-details.component";
import {FaqComponent} from "./faq/faq.component";
import {FaqAdminComponent} from "./faq-admin/faq-admin.component";
import {ProfileUserComponent} from "./profile-user/profile-user.component";
import {DashboardModule} from "./demo/components/dashboard/dashboard.module";
import {ChatUserComponent} from "./chat-user/chat-user.component";

@NgModule({
    declarations: [AppComponent,
        NotfoundComponent,
        SendreclamationComponent,
        CategoriesComponent,
        PostsComponent,
        ThreadsComponent,
        ForumsComponent, HeaderComponent,HomeComponent,PostDetailsComponent,FaqComponent,FaqAdminComponent,ProfileUserComponent,ChatUserComponent


    ],
    imports: [AppRoutingModule, AppLayoutModule,
        CommonModule,
        FormsModule,
        DropdownModule,
        InputTextareaModule,
        ButtonModule,
        RippleModule, FileUploadModule, TableModule, DialogModule,
        ReactiveFormsModule,
        InputTextModule, DashboardModule,
    ],

    providers: [
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [
        HeaderComponent
    ]
})
export class AppModule {}
