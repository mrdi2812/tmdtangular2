import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';
import { NotificationService } from '../../core/service/notification.service';
import { ModalDirective } from 'ngx-bootstrap';
import { MessageContstants } from '../../core/common/message.constants';
import { AuthenService } from '../../core/service/authen.service';
import { SystemConstants } from '../../core/common/system.constants';
import { UploadService } from '../../core/service/upload.service';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  @ViewChild('modalAddEditModal') modalAddEditModal: ModalDirective
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public totalItems: number;
  public totalPage: number;
  public modeldata: any;
  public productCategorys: any[];
  public LinkBase  = SystemConstants.BASE_API;

  @ViewChild(TreeComponent)
  private treeProductCategory: TreeComponent;
  public producCategoriestHierachy :any[];
  @ViewChild('avatar') avatar;
  
  constructor(private dataService: DataService, private utilityService: UtilityService,
    private notificationService: NotificationService,private _uploadService: UploadService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.dataService.get('/api/productCategory/getall?filter=' + this.filter).subscribe((response: any[]) => {
      this.productCategorys = response.filter(x => x.ParentID == null);;
      this.producCategoriestHierachy = this.utilityService.Unflatten2(response);
    }, error => this.dataService.handleError(error));
  }
  showAddModal() {
    this.modeldata = {};
    this.modalAddEditModal.show();
  }
  hideAddModal(): void {
    this.modalAddEditModal.hide();
  }
  getDetailProductCategory(id: any) {
    this.dataService.get('/api/productCategory/detail/' + id)
      .subscribe((response: any) => {
        this.modeldata = response;
      });
  }
  getProductCategory(id: any) {
    this.dataService.get('/api/productCategory/getallhierachy').subscribe((response: any[]) => {
      this.productCategorys = response;
    }, error => this.dataService.handleError(error));
  }
  showEditModal(id: any): void {
    this.getDetailProductCategory(id);
    this.modalAddEditModal.show();
  }
  saveChange(valid: boolean) {
    if (valid) {
      let file = this.avatar.nativeElement;
      if (file.files.length) {
        this._uploadService.postWithFile('/api/upload/saveImage', null, file.files).then((imageUrl: string) => {
          this.modeldata.Image = imageUrl;
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
    if (this.modeldata.ID == undefined) {
      this.dataService.post('/api/productCategory/add', JSON.stringify(this.modeldata)).subscribe((response: any) => {
        this.loadData();
        this.modalAddEditModal.hide();
        this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      }, error => {
        this.dataService.handleError(error);
      });
    }
    else {
      this.dataService.put('/api/productCategory/update', JSON.stringify(this.modeldata)).subscribe((response: any) => {
        this.loadData();
        this.modalAddEditModal.hide();
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
    this.dataService.delete('/api/productCategory/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
  createAlias(){
    this.modeldata.Alias = this.utilityService.MakeSeoTitle(this.modeldata.Name);
  }
}
