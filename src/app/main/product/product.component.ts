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
  // Khai báo biến cho phần PRODUCT
  @ViewChild('modalAddEditModal') modalAddEditModal: ModalDirective
  @ViewChild('thumbnailImage') thumbnailImage;
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
  public checkItems: any[];
  public LinkBase = SystemConstants.BASE_API;

  //Khai báo biến cho phần quản lý ảnh sản phẩm
  @ViewChild('imageAddEditModal') imageAddEditModal: ModalDirective
  @ViewChild('pathImage') pathImage;
  public imagemodel: any;
  public productImage: any[] = [];
  //Khai báo biến cho phần quản lý số lượng sản phẩm
  @ViewChild('quantityAddEditModal') quantityAddEditModal : ModalDirective
  public quantityModel: any;
  public productQuantitys: any[] = [];
  public colors: any;
  public sizes :any;
  public sizeId: number = null;
  public colorId: number = null;
  constructor(private _dataService: DataService, private _notificationService: NotificationService,
    private _uploadService: UploadService, private utilityService: UtilityService, public authenService: AuthenService) { }

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
    this._dataService.get('/api/productCategory/getallhierachy').subscribe((response: any) => {
      this.productCategories = response;
    }, error => this._dataService.handleError(error));
  }
  getDetailProduct(id: any) {
    this._dataService.get('/api/product/detail/' + id)
      .subscribe((response: any) => {
        this.modeldata = response;
      });
  }
  resetfilter() {
    this.filter = '';
    this.filtercategoryId = null;
    this.loadData();
  }
  showAddModal(): void {
    this.modeldata = { Content: '' };
    this.modalAddEditModal.show();
  }
  showEditModal(id: any): void {
    this.getDetailProduct(id);
    this.modalAddEditModal.show();
  }

  createAlias() {
    this.modeldata.Alias = this.utilityService.MakeSeoTitle(this.modeldata.Name);
  }
  saveChange(valid: boolean) {
    if (valid) {
      let file = this.thumbnailImage.nativeElement;
      if (file.files.length) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=product', null, file.files).then((imageUrl: string) => {
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
  deleteMuti() {
    this.checkItems = this.products.filter(x => x.Checked == true);
    if (this.checkItems.length > 0) {
      var listItem = [];
      for (var i = 0; i < this.checkItems.length; i++) {
        listItem.push(this.checkItems[i]["ID"]);
      }
      this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => {
        this._dataService.delete('/api/product/deletemulti', 'checkedProducts', JSON.stringify(listItem)).subscribe((response: any) => {
          this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
          this.loadData();
        }, error => this._dataService.handleError(error))
      });
    }
    else {
      this._notificationService.printErrorMessage(MessageContstants.NO_RECORD_MSG);
    }

  }
  /*Quản lý ảnh sản phẩm*/
  loadProductImage(id: number) {
    this._dataService.get('/api/productImage/getall?productId=' + id).subscribe((response: any[]) => {
      this.productImage = response;
    }, error => this._dataService.handleError(error));
  }
  showImageManage(id: number) {
    this.imagemodel = {};
    this.imagemodel.ProductId = id;
    this.loadProductImage(id);
    this.imageAddEditModal.show();
  }
  saveImageProduct(valid: boolean) {
    if (valid) {
      let file = this.pathImage.nativeElement;
      if (file.files.length) {
        this._uploadService.postWithFile('/api/upload/saveImage?type=product', null, file.files).then((imageUrl: string) => {
          this.imagemodel.Path = imageUrl;
          this._dataService.post('/api/productImage/add', JSON.stringify(this.imagemodel)).subscribe((response: any) => {
            this.loadProductImage(this.imagemodel.ProductId);
            this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          }, error => {
            this._dataService.handleError(error);
          });
        });
      }
    }
  }
  deleteImage(id: number) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.delete('/api/productImage/delete', 'id', id.toString()).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadProductImage(this.imagemodel.ProductId);
      }, error => this._dataService.handleError(error));
    });
  }
  /*Quản lý số lượng sản phẩm*/
  loadColors(){
    this._dataService.get('/api/productQuantity/getcolors?filter=' + this.filter)
    .subscribe((response: any[]) => {
      this.colors = response;
    });
  }
  loadSizes(){
    this._dataService.get('/api/productQuantity/getsizes?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this.sizes = response;
      });
  }
  loadProductQuantity(id: number) {
    this._dataService.get('/api/productQuantity/getall?productId=' +id+'&sizeId='+this.sizeId+'&colorId='+this.colorId).subscribe((response: any[]) => {
      this.productQuantitys = response;
    }, error => this._dataService.handleError(error));
  }
  showQuantityManage(id:any){
    this.quantityModel = {};
    this.quantityModel.ProductId = id;
    this.loadColors();
    this.loadSizes();
    this.loadProductQuantity(this.quantityModel.ProductId);
    this.quantityAddEditModal.show();
  }
  saveQuantityProduct(valid :boolean){
    if(valid){
      this._dataService.post('/api/productQuantity/add', JSON.stringify(this.quantityModel)).subscribe((response: any) => {
        this.loadProductQuantity(this.quantityModel.ProductId);
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      }, error => {
        this._dataService.handleError(error);
      });
    }
  }
  deleteQuantity(productId: number, colorId: string, sizeId: string){
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => {
      var parameters = { "productId": productId, "sizeId": sizeId, "colorId": colorId };
      this._dataService.deleteMuti('/api/productQuantity/delete',parameters).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadProductQuantity(this.quantityModel.ProductId);
      }, error => this._dataService.handleError(error));
    });
  }
}
