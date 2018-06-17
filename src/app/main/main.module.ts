import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { mainroutes } from './main.router';
import{HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(mainroutes)
  ],
  declarations: [MainComponent]
})
export class MainModule { }
