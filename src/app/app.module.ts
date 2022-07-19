import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* utils */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

import { GoogleLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { CookieModule } from 'ngx-cookie';

/* components */
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SharedModule } from './shared/shared.module';


import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppConfigService } from './services/app-config.service';
import { map } from 'rxjs/operators';

import { MatTableResponsiveModule } from './shared/tables/mat-table-responsive.module';
import { CerrarSessionComponent } from './auth/cerrar-session/cerrar-session.component';
import { LoadInterceptorService } from './interceptors/load-interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';




export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

export function socialConfigFactory(restService: AppConfigService) {
  return restService.getClientConfig().pipe(map(config => {
    let providers = [];
    if (config.clientId.length > 0) {
      providers.push({
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          config.clientId, {
            scope: 'email',
            plugin_name: 'loginARSA2'
          }
        ),
      });
    }
    return {
      autoLogin: false,
      providers: providers,
    } as SocialAuthServiceConfig;
  })).toPromise();
};

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    CerrarSessionComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    SharedModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCardModule,
    SocialLoginModule,
    CookieModule.forRoot(),
    MatTableResponsiveModule,
    NgxSpinnerModule,

  ],
  exports: [MatTableResponsiveModule
  ],

  providers: [
    [AppConfigService,
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
      {
        provide: APP_INITIALIZER,
        useFactory: initConfig,
        deps: [AppConfigService],
        multi: true,
      },
      {
        provide: 'SocialAuthServiceConfig',
        useFactory: socialConfigFactory,
        deps: [AppConfigService]
      },
      {
        provide:HTTP_INTERCEPTORS,
        useClass: LoadInterceptorService,
        multi: true,
      }
    ],
  ],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
