import { Component, OnInit,NgZone} from '@angular/core';
import { AuthenService } from '../../core/service/authen.service';
import { LoggedInUser } from '../../core/domain/loggin.user';
import {SystemConstants} from '../../core/common/system.constants';
import { UtilityService } from '../../core/service/utility.service';
import {SignalrService} from '../../core/service/signalr.service';
import { DataService } from '../../core/service/data.service';
declare var moment :any;
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  public data :LoggedInUser;
  public LinkBase  = SystemConstants.BASE_API;
  public canSendMessage : Boolean;
  private announcements :any[];
  constructor(private authenService :AuthenService,private utilityService:UtilityService,
  private signalrService: SignalrService,private dataService:DataService,private ngZone : NgZone) {
      // this can subscribe for events
      this.subscribeToEvents();
      // this can check for conenction exist or not.
      this.canSendMessage = signalrService.connectionExists;
   }

  ngOnInit() {
    this.data = this.authenService.getLoginUser();
    this.loadAnnouncements();
  }
  logout(){
    this.authenService.logout();
    this.utilityService.navigateToLogin();
  }
  private subscribeToEvents(): void {

    var self = this;
    self.announcements = [];

    // if connection exists it can call of method.
    this.signalrService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.
    this.signalrService.announcementReceived.subscribe((announcement: any) => {
      this.ngZone.run(() => {
        announcement.CreatedDate =moment(announcement.CreatedDate).startOf('minute').locale("vi").fromNow();
        self.announcements.push(announcement);
      });
    });
  }

  markAsRead(id: number) {
    var body = { announId: id };
    this.dataService.get('/api/Announcement/markAsRead?announId=' + id.toString()).subscribe((response: any) => {
      if (response) {
        this.loadAnnouncements();
      }
    });
  }

  private loadAnnouncements() {
    this.dataService.get('/api/Announcement/getTopMyAnnouncement').subscribe((response: any) => {
      this.announcements = [];
      for (let item of response) {
        item.CreatedDate = moment(item.CreatedDate).startOf('minute').locale("vi").fromNow();
        this.announcements.push(item);
      }

    });
  }
}
