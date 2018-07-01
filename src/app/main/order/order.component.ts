import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';
import { AuthenService } from '../../core/service/authen.service';
import { NotificationService } from '../../core/service/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
declare var moment: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filterStartDate: string ='';
  public filterEndDate: string='';
  public filterCustomerName: string='';
  public filterPaymentStatus: string='';
  public products: any[];
  public totalItems: number;
  public totalPage: number;
  public listOrder: any[]=[];
  constructor(private _dataService: DataService, private _notificationService: NotificationService,
   private utilityService: UtilityService, public authenService: AuthenService) {
    if (authenService.checkAccess('USER') == false) {
      utilityService.navigateToLogin();
    }
   }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    this._dataService.get('/api/Order/getlistpaging?startDate=' + this.filterStartDate + '&endDate=' + this.filterEndDate + '&customerName=' + this.filterCustomerName+
  '&paymentStatus='+this.filterPaymentStatus+'&page='+this.pageIndex+'&pageSize='+this.pageSize)
    .subscribe((response: any) => {
      this.listOrder = response.Items;
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
  resetfilter(){
    this.filterStartDate = '';
    this.filterEndDate = '';
    this.filterCustomerName = '';
    this.filterPaymentStatus = '';
    this.loadData();
  }
  public selectedStartDate(value: any) {
    console.log(value);
    this.filterStartDate = moment(value.end._d).format('DD/MM/YYYY');
  }
  public selectedEndDate(value: any) {
    console.log(value);
    this.filterEndDate = moment(value.end._d).format('DD/MM/YYYY');
  }
  deleteOrder(id:any){
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => {
      this._dataService.delete('/api/order/delete', 'id', id).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.loadData();
      }, error => this._dataService.handleError(error));
    });
  }
}
