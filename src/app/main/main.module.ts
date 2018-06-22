import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { mainroutes } from './main.router';
import{HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import{RoleModule} from './role/role.module';
import { AuthenService } from '../core/service/authen.service';
import { UtilityService } from '../core/service/utility.service';
import { DataService } from '../core/service/data.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(mainroutes),FormsModule
  ],
  providers:[AuthenService,UtilityService,DataService],
  declarations: [MainComponent]
})
export class MainModule { }
