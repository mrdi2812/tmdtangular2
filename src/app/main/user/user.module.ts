import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/service/data.service';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { UploadService } from '../../core/service/upload.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
const userroutes : Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:UserComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userroutes),
    PaginationModule,
    FormsModule,
    ModalModule,
    Daterangepicker,
    AngularMultiSelectModule
  ],
  providers:[DataService,UploadService],
  declarations: [UserComponent]
})
export class UserModule { }
