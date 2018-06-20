import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../core/service/authen.service';
import { UrlConstants } from '../core/common/url.constants';
import { Router } from '@angular/router';
import { UtilityService } from '../core/service/utility.service';
import { LoggedInUser } from '../core/domain/loggin.user';
import { SystemConstants } from '../core/common/system.constants';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  data : LoggedInUser;
  constructor(private authenService : AuthenService,private router: Router,private utilityService :UtilityService) { }

  ngOnInit() {
    this.data =JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  logout(){
    this.authenService.logout();
    this.utilityService.navigateToLogin();
  }

}
