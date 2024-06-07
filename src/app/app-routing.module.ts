import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {SendreclamationComponent} from "./demo/components/sendreclamation/sendreclamation.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ThreadsComponent} from "./threads/threads.component";
import {PostsComponent} from "./posts/posts.component";
import {ForumsComponent} from "./forum/forum.component";
import {HomeComponent} from "./home/home.component";
import {PostDetailsComponent} from "./post-details/post-details.component";
import {FaqComponent} from "./faq/faq.component";
import {FaqAdminComponent} from "./faq-admin/faq-admin.component";
import {ProfileUserComponent} from "./profile-user/profile-user.component";
import {ChatUserComponent} from "./chat-user/chat-user.component";
import {ThreadsAdminComponent} from "./threads-admin/threads-admin.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'admin', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    {path : "categories", component: CategoriesComponent},
                    {path : "faq", component: FaqAdminComponent},
                    {path : "forum", component: ThreadsAdminComponent},
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'home', component : HomeComponent},
            { path: 'sendreclamation', component: SendreclamationComponent},
            {path : "chat" , component : ChatUserComponent},
            { path: 'user/profile', component: ProfileUserComponent},
            {path : 'forum/threads/:categoryId', component: ThreadsComponent},
            {path : 'forum/thread/posts/:threadId', component: PostsComponent},
            {path : 'forum/thread/posts/post/:id', component: PostDetailsComponent},
            {path :'faq' , component:FaqComponent},
            {path:'forum',component: ForumsComponent},
            {path:'posts', component: PostsComponent},
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
