import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenService } from '../core/service/authen.service';
import { NotificationService } from '../core/service/notification.service';
export const loginroutes : Routes = [
{path:'',component:LoginComponent}
]
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(loginroutes)
  ],
  providers:[AuthenService,NotificationService],
  declarations: [LoginComponent]
})
export class LoginModule { }
