import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/service/data.service';
import { ModalModule } from 'ngx-bootstrap';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { SimpleTinyComponent } from '../../shared/simple-tiny/simple-tiny.component';
const productroutes : Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:ProductComponent}

]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productroutes),
    FormsModule,
    ModalModule,
    PaginationModule,

  ],
  providers:[DataService],
  declarations: [ProductComponent,SimpleTinyComponent]
})
export class ProductModule { }
