import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import {UsersComponent} from "./users/users.component";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {ProgressBarModule} from "primeng/progressbar";
import {SliderModule} from "primeng/slider";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ReclamationsComponent} from "./reclamations/reclamations.component";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {RippleModule} from "primeng/ripple";
import {TagModule} from "primeng/tag";
import {ReclamationDetailsComponent} from "./reclamations/reclamationDetails/reclamationDetails.component";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {PasswordModule} from "primeng/password";
import {AddAdminComponent} from "./users/addAdmin/addAdmin.component";
import {ProfileComponent} from "./profile/profile.component";
import {ChatComponent} from "./chat/chat.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        DropdownModule,
        InputTextModule,
        MultiSelectModule,
        ProgressBarModule,
        SliderModule,
        ToggleButtonModule,
        OverlayPanelModule,
        RippleModule,
        TagModule,
        CardModule,
        DividerModule,
        CheckboxModule,
        PasswordModule,

    ],
    exports: [
        ProfileComponent,
        ChatComponent
    ],
    declarations: [
        DashboardComponent,
        UsersComponent,
        ReclamationsComponent,
        ReclamationDetailsComponent,
        AddAdminComponent,
        ProfileComponent,
        ChatComponent
    ]
})
export class DashboardModule { }
