import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { SystemConstants } from '../../core/common/system.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/service/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
@Component({
  selector: 'app-product-color',
  templateUrl: './product-color.component.html',
  styleUrls: ['./product-color.component.css']
})
export class ProductColorComponent implements OnInit {
  public filter: string = '';
  public colors: any[];
  public modeldata: any;
  @ViewChild('modalColorEdit') modalColorEdit: ModalDirective;
  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this._dataService.get('/api/productQuantity/getcolors?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this.colors = response;
      });
  }
  showAddModal(): void {
    this.modeldata = {};
    this.modalColorEdit.show();
  }
  saveChange() {
      if (this.modeldata.Id == undefined) {
        this._dataService.post('/api/productQuantity/addcolor', JSON.stringify(this.modeldata)).subscribe((response: any) => {
          this.loadData();
          this.modalColorEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => {
          this._dataService.handleError(error);
        });
      }
  }
  deleteItem(id:any){
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,()=>this.deleteItemConfirm(id));
  }
  deleteItemConfirm(id:any){
    this._dataService.delete('/api/productQuantity/deletecolor','colorId',id).subscribe((response: any) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }

}
