import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { RouterModule } from '@angular/router';
import { OrderRouter } from './order.routes';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/service/data.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { UploadService } from '../../core/service/upload.service';
import { UtilityService } from '../../core/service/utility.service';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OrderRouter),
    FormsModule,
    PaginationModule,
    ModalModule,
    Daterangepicker
  ],
  providers:[DataService,UploadService,UtilityService],
  declarations: [OrderComponent, OrderAddComponent, OrderDetailComponent]
})
export class OrderModule { }
