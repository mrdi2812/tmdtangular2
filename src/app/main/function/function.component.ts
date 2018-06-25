import { Component, OnInit,ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';
import { NotificationService } from '../../core/service/notification.service';
import { ModalDirective } from 'ngx-bootstrap';
import { MessageContstants } from '../../core/common/message.constants';
@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {
  @ViewChild('modalAddEdit') modalAddEdit: ModalDirective;
@ViewChild(TreeComponent)
private treeFunction: TreeComponent;

public _functionHierachy: any[];
public _functions: any[];
public modeldata: any;
public filter: string = '';
  constructor(private dataService:DataService,private utilityService :UtilityService,private notificationService :NotificationService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    this.dataService.get('/api/function/getall?filter='+this.filter).subscribe((response:any[])=>{
      this._functions = response.filter(x=>x.ParentId==null);
      this._functionHierachy = this.utilityService.Unflatten(response);
    },error=>this.dataService.handleError(error));
  }
  showAddModal(): void {
    this.modeldata = {};
    this.modalAddEdit.show();
  }
  hideAddModal(): void {
    this.modalAddEdit.hide();
  }
  getDetailFunction(id: any) {
    this.dataService.get('/api/function/detail/' + id)
      .subscribe((response: any) => {
        this.modeldata = response;
      });
  }
  showEditModal(id: any): void {
    this.getDetailFunction(id);
    this.modalAddEdit.show();
  }
  saveChange(valid:boolean){
    if (this.modeldata.Id == undefined) {
      this.dataService.post('/api/function/add', JSON.stringify(this.modeldata)).subscribe((response: any) => {
        this.loadData();
        this.modalAddEdit.hide();
        this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      }, error => {
        this.dataService.handleError(error);
      });
    }
    else {
      this.dataService.put('/api/function/update', JSON.stringify(this.modeldata)).subscribe((response: any) => {
        this.loadData();
        this.modalAddEdit.hide();
        this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      }, error => {
        this.dataService.handleError(error);
      });
    }
  }
  deleteItem(id: any) {
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }
  deleteItemConfirm(id: any) {
    this.dataService.delete('/api/function/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
}
