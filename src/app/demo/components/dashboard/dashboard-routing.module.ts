import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {UsersComponent} from "./users/users.component";
import {ReclamationsComponent} from "./reclamations/reclamations.component";
import {ReclamationDetailsComponent} from "./reclamations/reclamationDetails/reclamationDetails.component";
import {AddAdminComponent} from "./users/addAdmin/addAdmin.component";
import {ProfileComponent} from "./profile/profile.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'users', component: UsersComponent },
        { path: 'users/addAdmin', component: AddAdminComponent },
        { path: 'profile', component: ProfileComponent },


        { path: 'reclamations', component: ReclamationsComponent },
        { path: 'reclamations/:reclamationId', component: ReclamationDetailsComponent }



    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
