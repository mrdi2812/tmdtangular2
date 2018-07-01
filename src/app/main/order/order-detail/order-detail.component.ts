import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/service/data.service';
import { NotificationService } from '../../../core/service/notification.service';
import { UtilityService } from '../../../core/service/utility.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public modeldata: any;
  public orderDetails: any[] = [];
  public totalCount: number = 0;
  constructor(private dataService: DataService, private utilityService: UtilityService,
    private notìicationService: NotificationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let orderId = params['id'];
      this.loadOrder(params['id']);
      this.loadOrderDetail(params['id']);
    });
  }
  goBack() {
    this.utilityService.navigate('/main/order/index');
  }
  loadOrder(id:number){
    this.dataService.get('/api/order/detail/' + id.toString()).subscribe((response: any) => {
      this.modeldata = response;
    }, error => this.dataService.handleError(error));
  }
  loadOrderDetail(id :number) {
    this.dataService.get('/api/order/getalldetails/' + id.toString()).subscribe((response: any[]) => {
      this.orderDetails = response;
      for(var item of this.orderDetails){
        this.totalCount += item.Quantity * item.Price;
      }
    }, error => this.dataService.handleError(error));
  }
  exportToExcel(){

  }
}
