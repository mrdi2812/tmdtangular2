import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';
import { AnnounRouter } from './announcement.router';
import { FormsModule } from '@angular/forms';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';

@NgModule({
  imports: [
    CommonModule,
    AnnounRouter,
    FormsModule,
    PaginationModule,
    ModalModule
  ],
  providers:[DataService],
  declarations: [AnnouncementComponent]
})
export class AnnouncementModule { }
