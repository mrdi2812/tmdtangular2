import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../core/service/data.service';
import { NotificationService } from '../../../core/service/notification.service';
import { UtilityService } from '../../../core/service/utility.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  @ViewChild('orderAddEditModal') orderAddEditModal: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public colors: any[];
  public sizes: any[];
  public products: any[];
  public product: any;
  public orderDetails: any[] = [];
  public orderEntity: any = {
    ProductID: 0,
    Quantity: 0,
    Price: 0
  };
  public totalCount:number=0;
  public totalItems: number;
  public totalPage: number;
  public modeldata: any = { Status: true };
  constructor(private dataService: DataService, private utilityService: UtilityService,
    private notìicationService: NotificationService) { }

  ngOnInit() {

  }
  goBack(){
    this.utilityService.navigate('/main/order/index');
  }
  saveChange(valid:boolean) {
    if(valid){
      this.modeldata.OrderDetails=this.orderDetails;
      this.dataService.post('/api/Order/add', JSON.stringify(this.modeldata)).subscribe((response: any) => {
        this.notìicationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        this.utilityService.navigate('/main/order/index');
      }, error => {
        this.dataService.handleError(error);
      });
    }
  }
  loadColor() {
    this.dataService.get('/api/productQuantity/getcolors?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this.colors = response;
      }, error => this.dataService.handleError(error));
  }
  loadSize() {
    this.dataService.get('/api/productQuantity/getsizes?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this.sizes = response;
      });
  }
  loadProduct() {
    this.dataService.get('/api/product/getallparents').subscribe((response: any[]) => {
      this.products = response;
    }, error => this.dataService.handleError(error));
  }
  getPrice() {
    this.product = this.products.find(x => x.ID == this.orderEntity.ProductID);
    if (this.product != null) {
      this.orderEntity.Price = this.product.Price;
    }
    else {
      this.orderEntity.Price = null;
    }
  }
  showOrderDetail() {
    this.loadColor();
    this.loadProduct();
    this.loadSize();
    this.orderAddEditModal.show();
  }
  saveOrderDetail(valid: boolean) {
    if (valid) {
      this.orderEntity.Product = this.products.find(x=>x.ID==this.orderEntity.ProductID);
      this.orderEntity.Color = this.colors.find(x=>x.ID==this.orderEntity.ColorId);
      this.orderEntity.Size = this.sizes.find(x=>x.ID==this.orderEntity.SizeId);
      this.orderDetails.push(this.orderEntity);
      this.orderEntity = {
        ProductID: 0,
        Quantity: 0,
        Price: 0
      };
      for(let item of this.orderDetails){
        this.totalCount+=Number(item.Price)*Number(item.Quantity);
      }
      this.orderAddEditModal.hide();
    }
  }
  deleteOrdetail(item: any) {
    for (var index = 0; index < this.orderDetails.length; index++) {
      let orderDetail = this.orderDetails[index];
      if (orderDetail.ProductID == item.ProductID
        && orderDetail.ColorId == item.ColorId
        && orderDetail.SizeId == item.SizeId) {
        this.orderDetails.splice(index, 1);
        this.totalCount = this.totalCount - (orderDetail.Price*orderDetail.Quantity);
      }
    }
  }
}
