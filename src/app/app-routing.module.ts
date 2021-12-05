import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';


import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginComponent } from './login/login.component';


//const routes: Routes = [];

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login/callback',
        component: OktaCallbackComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [OktaAuthGuard]
    },
    {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [OktaAuthGuard]
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }