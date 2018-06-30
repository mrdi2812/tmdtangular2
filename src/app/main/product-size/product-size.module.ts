import { ProductSizeComponent } from './product-size.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/service/data.service';
import { ModalModule } from 'ngx-bootstrap';
const productSizeroutes : Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:ProductSizeComponent}

]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(productSizeroutes),
    ModalModule
  ],
  declarations: [ProductSizeComponent]
})
export class ProductSizeModule { }
