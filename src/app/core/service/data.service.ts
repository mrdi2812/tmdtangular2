import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Routes } from '@angular/router';
import { SystemConstants } from '../common/system.constants';
import { AuthenService } from './authen.service';
import { MessageContstants } from '../common/message.constants';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private headers: Headers;
  constructor(private _http: Http, private _routes: Routes, private _authenService: AuthenService
  ,private _notificationService : NotificationService,private _utilityService :UtilityService) { }
  get(url: string) {
    this.headers.delete("Authorinzation");
    this.headers.append("Authorinzation", "Bearer" + this._authenService.getLoginUser().access_token);
    return this._http.get(SystemConstants.BASE_API + url, { headers: this.headers }).map(this.extraData);
  }
  post(url: string, data?: any) {
    this.headers.delete("Authorinzation");
    this.headers.append("Authorinzation", "Bearer" + this._authenService.getLoginUser().access_token);
    return this._http.post(SystemConstants.BASE_API + url, data, { headers: this.headers }).map(this.extraData);
  }
  put(url: string, data?: any) {
    this.headers.delete("Authorinzation");
    this.headers.append("Authorinzation", "Bearer" + this._authenService.getLoginUser().access_token);
    return this._http.put(SystemConstants.BASE_API + url, data, { headers: this.headers }).map(this.extraData);
  }
  delete(url: string, id: number, key: string) {
    this.headers.delete("Authorinzation");
    this.headers.append("Authorinzation", "Bearer" + this._authenService.getLoginUser().access_token);
    return this._http.put(SystemConstants.BASE_API + url + "/?" + key + "=" + id, { headers: this.headers }).map(this.extraData);
  }
  postFile(url: string, data?: any) {
    this.headers.append("Authorinzation", "Bearer" + this._authenService.getLoginUser().access_token);
    return this._http.post(SystemConstants.BASE_API + url, data, { headers: this.headers }).map(this.extraData);
  }
  private extraData(response: Response) {
    let body = response.json();
    return body || {};
  }
  public handleError(error: any) {
    if (error.status == 401) {
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
        this._utilityService.navigateToLogin();
    }
    else {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Lỗi hệ thống';
        this._notificationService.printErrorMessage(errMsg);

        return Observable.throw(errMsg);
    }
  }

}
