import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { OKTA_CONFIG, OktaAuthModule, } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

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
    AppRoutingModule, //RouterModule.forRoot(appRoutes),
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
