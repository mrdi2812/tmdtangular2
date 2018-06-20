import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../core/service/authen.service';
import { UrlConstants } from '../core/common/url.constants';
import { Router } from '@angular/router';
import { UtilityService } from '../core/service/utility.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authenService : AuthenService,private router: Router,private utilityService :UtilityService) { }

  ngOnInit() {
  }
  logout(){
    this.authenService.logout();
    //this.router.navigate([UrlConstants.LOGIN]);
    this.utilityService.navigateToLogin();
  }
}
