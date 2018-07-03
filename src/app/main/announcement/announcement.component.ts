import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { SystemConstants } from '../../core/common/system.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/service/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public announcements: any[];
  public totalItems: number;
  public totalPage: number;
  public modeldata: any;
  @ViewChild('modalAddEdit') modalAddEdit: ModalDirective;
  constructor(private dataService: DataService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.dataService.get('/api/Announcement/getall?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize)
      .subscribe((response: any) => {
        this.announcements = response.Items;
        this.pageIndex = response.PageIndex;
        this.pageSize = response.PageSize;
        this.totalItems = response.TotalRows;
      });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.totalPage = event.numPages;
    this.loadData();
  }
  getDetailAnnounement(id: any) {
    this.dataService.get('/api/Announcement/detail/' + id)
      .subscribe((response: any) => {
        this.modeldata = response;
      });
  }
  showAddModal(): void {
    this.modeldata = {};
    this.modalAddEdit.show();
  }
  showEditModal(id: any): void {
    this.getDetailAnnounement(id);
    this.modalAddEdit.show();
  }
  saveChange() {
        this.dataService.post('/api/Announcement/add', JSON.stringify(this.modeldata)).subscribe((response: any) => {
          this.loadData();
          this.modalAddEdit.hide();
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => {
          this.dataService.handleError(error);
        });
  }
  deleteItem(id:any){
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,()=>{
      this.dataService.delete('/api/Announcement/delete','id',id).subscribe((response: any) => {
        this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadData();
      });
    });
  }
}
