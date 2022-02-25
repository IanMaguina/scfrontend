import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { UsersComponent } from './management/users/users.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    UsersComponent
  ],
  imports: [ 
    CommonModule,
    SharedModule,
    AppRoutingModule
   ],
  exports: [
    DashboardComponent,
    PagesComponent
  ]
})
export class PagesModule { }
