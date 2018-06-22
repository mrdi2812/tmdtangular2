import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/service/data.service';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
const roleroutes : Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:RoleComponent}

]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roleroutes),
    PaginationModule,
    FormsModule,
    ModalModule,
  ],
  providers:[DataService],
  declarations: [RoleComponent]
})
export class RoleModule { }
