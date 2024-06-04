import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        SweetAlert2Module,
        ReactiveFormsModule,

    ]
})
export class AuthModule { }
