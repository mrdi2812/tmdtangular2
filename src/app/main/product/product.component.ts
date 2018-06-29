import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { UploadService } from '../../core/service/upload.service';
import { UtilityService } from '../../core/service/utility.service';
import { NotificationService } from '../../core/service/notification.service';
import { SystemConstants } from '../../core/common/system.constants';
import { ModalDirective } from 'ngx-bootstrap';
import { MessageContstants } from '../../core/common/message.constants';
import { AuthenService } from '../../core/service/authen.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public filtercategoryId: number;
  public products: any[];
  public totalItems: number;
  public totalPage: number;
  public modeldata: any;
  public productCategories: any[];
  public LinkBase = SystemConstants.BASE_API;
  @ViewChild('modalAddEditModal') modalAddEditModal: ModalDirective
  @ViewChild('thumbnailImage') thumbnailImage;
  constructor(private _dataService: DataService, private _notificationService: NotificationService,
    private _uploadService: UploadService, private utilityService: UtilityService,public authenService:AuthenService) { }

  ngOnInit() {
    this.loadData();
    this.loadProductCategory();
    if (this.authenService.checkAccess('USER') == false) {
      this.utilityService.navigateToLogin();
    }
  }
  loadData() {
    this._dataService.get('/api/product/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.filter + '&categoryId=' + this.filtercategoryId)
      .subscribe((response: any) => {
          this.products = response;
          this.totalItems = response.length;
      });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.totalPage = event.numPages;
    this.loadData();
  }

  loadProductCategory() {
    this._dataService.get('/api/productCategory/getallhierachy').subscribe((response: any[]) => {
      this.productCategories = response;
    }, error => this._dataService.handleError(error));
  }
  getDetailProduct(id: any) {
    this._dataService.get('/api/product/detail/' + id)
      .subscribe((response: any) => {
        this.modeldata = response;
      });
  }
  resetfilter(){
    this.filter='';
    this.filtercategoryId=null;
    this.loadData();
  }
  showAddModal(): void {
    this.modeldata = { Content: ''};
    this.modalAddEditModal.show();
  }
  showEditModal(id: any): void {
    this.getDetailProduct(id);
    this.modalAddEditModal.show();
  }
  showImageManage(id:any){

  }
  showQuantityManage(id:any){

  }
  createAlias(){
    this.modeldata.Alias = this.utilityService.MakeSeoTitle(this.modeldata.Name);
  }
  saveChange(valid: boolean) {
    if (valid) {
      let file = this.thumbnailImage.nativeElement;
      if (file.files.length) {
        this._uploadService.postWithFile('//api/upload/saveImage?type=product', null, file.files).then((imageUrl: string) => {
          this.modeldata.ThumbnailImage = imageUrl;
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
      this._dataService.post('/api/product/add', JSON.stringify(this.modeldata)).subscribe((response: any) => {
        this.loadData();
        this.modalAddEditModal.hide();
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      }, error => {
        this._dataService.handleError(error);
      });
    }
    else {
      this._dataService.put('/api/product/update', JSON.stringify(this.modeldata)).subscribe((response: any) => {
        this.loadData();
        this.modalAddEditModal.hide();
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
    this._dataService.delete('/api/product/delete', 'id', id).subscribe((response: any) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
  public keyupHandlerContentFunction(e: any) {
    this.modeldata.Content = e;
  }
}
