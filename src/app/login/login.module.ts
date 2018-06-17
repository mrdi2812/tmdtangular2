import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
export const loginroutes : Routes = [
{path:'',component:LoginComponent}
]
@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(loginroutes)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
