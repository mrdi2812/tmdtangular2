import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/service/data.service';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap';
import { TreeModule } from 'angular-tree-component';
const productCategoryroutes : Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:ProductCategoryComponent}

]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(productCategoryroutes),
    ModalModule,
    PaginationModule,
    TreeModule
  ],
  providers:[DataService],
  declarations: [ProductCategoryComponent]
})
export class ProductCategoryModule { }
