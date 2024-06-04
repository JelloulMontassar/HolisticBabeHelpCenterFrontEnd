import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {ForgotpasswordComponent} from "./forgotpassword.component";
import {ConfirmComponent} from "./confirm.component";
import {RegisterComponent} from "../register/register.component";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        MessagesModule,
        MessageModule
    ],
    declarations: [LoginComponent,ForgotpasswordComponent,ConfirmComponent,RegisterComponent]
})
export class LoginModule { }
