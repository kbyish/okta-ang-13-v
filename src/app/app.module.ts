/*!
 * Copyright (c) 2020-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router } from '@angular/router';
import {
  OKTA_CONFIG,
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';

import sampleConfig from './app.config';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from 'src/environments/environment';

// const oktaConfig = Object.assign({
//   onAuthRequired: (_: undefined, injector: Injector) => {
//     const router = injector.get(Router);
//     // Redirect the user to your custom login page
//     router.navigate(['/login']);
//   }
// }, sampleConfig.oidc);

//const oktaAuth = new OktaAuth(oktaConfig);

const oidc = {
  clientId: `0oa2yjbi07H9YNwQI5d7`,
  issuer: `https://dev-00314289.okta.com/oauth2/default`,
  redirectUri: '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,

};

const appRoutes: Routes = [
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
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    MessagesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule,
  ],
  providers: [
    {
      provide: OKTA_CONFIG,
      useFactory: () => {
        const oktaAuth = new OktaAuth(oidc);
        return { oktaAuth };
      }
    },
    { provide: APP_BASE_HREF, useValue: environment.appBaseHref },

    //{ provide: OKTA_CONFIG, useValue: { oktaAuth } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
