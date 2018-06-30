import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/service/data.service';
import { ModalModule } from 'ngx-bootstrap';
import { ProductColorComponent } from './product-color.component';
const productColorroutes : Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:ProductColorComponent}

]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(productColorroutes),
    ModalModule
  ],
  declarations: [ProductColorComponent]
})
export class ProductColorModule { }
