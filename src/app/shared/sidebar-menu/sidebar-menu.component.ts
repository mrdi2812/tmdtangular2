import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../core/service/utility.service';
import { AuthenService } from '../../core/service/authen.service';
import { DataService } from '../../core/service/data.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
 public functions :any[];
  constructor(private authenService :AuthenService,private utilityService:UtilityService,private dataService:DataService) { }

  ngOnInit() {
    this.dataService.get('/api/function/getlisthierarchy').subscribe((response:any[])=>{
         response.sort((s1,s2)=>{
        if(s1.DisplayOrder>s2.DisplayOrder)
           return 1;
        if(s1.DisplayOrder<s2.DisplayOrder)
          return -1;
        return 0;
      });
      this.functions = response;
    },error=>this.dataService.handleError(error));
  }
  logout(){
    this.authenService.logout();
    this.utilityService.navigateToLogin();
  }
}
