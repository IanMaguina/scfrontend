import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GlobalSettings } from './shared/settings';
/* utils */
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

import { GoogleLoginProvider,SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';

/* components */
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SharedModule } from './shared/shared.module';


import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    PagesModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    SharedModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCardModule,
    SocialLoginModule
  ],
  exports: [
  ],

  providers: [
    [
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(GlobalSettings.clientId)
            }
          ]
        } as SocialAuthServiceConfig,
      }
    ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
