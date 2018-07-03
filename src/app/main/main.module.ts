import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { mainroutes } from './main.router';
import{HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import{RoleModule} from './role/role.module';
import{ProductModule} from './product/product.module';
import { AuthenService } from '../core/service/authen.service';
import { UtilityService } from '../core/service/utility.service';
import { DataService } from '../core/service/data.service';
import { FormsModule } from '@angular/forms';
import { SidebarMenuComponent } from '../shared/sidebar-menu/sidebar-menu.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';
import { SignalrService } from '../core/service/signalr.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainroutes),FormsModule,
  ],
  providers:[AuthenService,UtilityService,DataService,SignalrService],
  declarations: [MainComponent,SidebarMenuComponent,TopMenuComponent]
})
export class MainModule { }
