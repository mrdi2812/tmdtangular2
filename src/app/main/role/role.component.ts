import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { SystemConstants } from '../../core/common/system.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/service/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public roles: any[];
  public totalItems: number;
  public totalPage: number;
  loading = false;
  public modeldata: any;
  @ViewChild('modalRoleEdit') modalRoleEdit: ModalDirective;
  constructor(private _dataService: DataService, private _notificationService: NotificationService) {

  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.roles = response.Items;
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
  getDetailRole(id: any) {
    this._dataService.get('/api/appRole/getdetail/' + id)
      .subscribe((response: any) => {
        this.modeldata = response;
      });
  }
  showAddModal(): void {
    this.modeldata = {};
    this.modalRoleEdit.show();
  }
  hideAddModal(): void {
    this.modalRoleEdit.hide();
  }
  showEditModal(id: any): void {
    this.getDetailRole(id);
    this.modalRoleEdit.show();
  }
  saveChange() {
      if (this.modeldata.Id == undefined) {
        this._dataService.post('/api/appRole/add', JSON.stringify(this.modeldata)).subscribe((response: any) => {
          this.loadData();
          this.modalRoleEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => {
          this._dataService.handleError(error);
        });
      }
      else {
        this._dataService.put('/api/appRole/update', JSON.stringify(this.modeldata)).subscribe((response: any) => {
          this.loadData();
          this.modalRoleEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => {
          this._dataService.handleError(error);
        });
      }
  }
  deleteItem(id:any){
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,()=>this.deleteItemConfirm(id));
  }
  deleteItemConfirm(id:any){
    this._dataService.delete('/api/appRole/delete','id',id).subscribe((response: any) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
}
