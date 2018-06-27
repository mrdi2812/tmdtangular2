import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../../core/service/authen.service';
import { LoggedInUser } from '../../core/domain/loggin.user';
import {SystemConstants} from '../../core/common/system.constants';
import { UtilityService } from '../../core/service/utility.service';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  public data :LoggedInUser;
  public LinkBase  = SystemConstants.BASE_API;
  constructor(private authenService :AuthenService,private utilityService:UtilityService) { }

  ngOnInit() {
    this.data = this.authenService.getLoginUser();
  }
  logout(){
    this.authenService.logout();
    this.utilityService.navigateToLogin();
  }
}
