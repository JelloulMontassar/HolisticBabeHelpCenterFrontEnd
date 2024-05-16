import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import {ForgotpasswordComponent} from "./forgotpassword.component";
import {ConfirmComponent} from "./confirm.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginComponent },
        { path: 'forgot', component: ForgotpasswordComponent },
        { path: 'forgot/confirm/:email', component: ConfirmComponent }

    ])],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
