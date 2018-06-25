import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { SystemConstants } from '../../core/common/system.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/service/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
import { UploadService } from '../../core/service/upload.service';
declare var moment: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public allRoles = [];
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public users: any[];
  public totalItems: number;
  public totalPage: number;
  public modeldata: any;
  public roles: any[];
  public LinkBase = SystemConstants.BASE_API;
  @ViewChild('modalUserEdit') modalUserEdit: ModalDirective;
  @ViewChild('avatar') avatar;
  constructor(private _dataService: DataService, private _notificationService: NotificationService,
    private _uploadService: UploadService) {

  }

  ngOnInit() {
    this.loadData();
    this.loadRoles();

  }

  loadData() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((response: any) => {
        this.users = response.Items;
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
  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };

  loadRoles() {
    this._dataService.get('/api/appRole/getlistall').subscribe((response: any[]) => {
      this.allRoles = [];
      for (let role of response) {
        this.allRoles.push({ Id: role.Id, Name: role.Name });
      }
    }, error => this._dataService.handleError(error));
  }
  getDetailUser(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((response: any) => {
        this.modeldata = response;
        //this.modeldata.BirthDay = moment(new Date(this.modeldata.BirthDay)).format('DD/MM/YYYY');
      });
  }
  showAddModal(): void {
    this.modeldata = {};
    this.modalUserEdit.show();
  }
  hideAddModal(): void {
    this.modalUserEdit.hide();
  }
  showEditModal(id: any): void {
    this.getDetailUser(id);
    this.modalUserEdit.show();
  }
  saveChange(valid: boolean) {
    if (valid) {
      let file = this.avatar.nativeElement;
      if (file.files.length) {
        this._uploadService.postWithFile('/api/upload/saveImage', null, file.files).then((imageUrl: string) => {
          this.modeldata.Avatar = imageUrl;
        }).then(() => {
          this.saveData();
        });
      }
      else {
        this.saveData();
      }
    }
  }
  saveData() {
    if (this.modeldata.Id == undefined) {
      this._dataService.post('/api/appUser/add', JSON.stringify(this.modeldata)).subscribe((response: any) => {
        this.loadData();
        this.modalUserEdit.hide();
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      }, error => {
        this._dataService.handleError(error);
      });
    }
    else {
      this._dataService.put('/api/appUser/update', JSON.stringify(this.modeldata)).subscribe((response: any) => {
        this.loadData();
        this.modalUserEdit.hide();
        this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      }, error => {
        this._dataService.handleError(error);
      });
    }
  }
  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }
  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: any) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
  public selectGender(event) {
    this.modeldata.Gender = event.target.value
  }
  public selectedDate(value: any) {
    console.log(value);
    this.modeldata.BirthDay = moment(value.end._d).format('DD/MM/YYYY');
  }
}
