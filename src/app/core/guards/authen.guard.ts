import {CanActivate,Router,RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {SystemConstants} from '../../core/common/system.constants';
import { UrlConstants } from '../common/url.constants';
import { Injectable } from '@angular/core';
import { AuthenService } from '../service/authen.service';
@Injectable()
export class AuthenGuard implements CanActivate{
   constructor(private router : Router,private authenService :AuthenService){

   }
   canActivate(activeRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot){
     if(localStorage.getItem(SystemConstants.CURRENT_USER)){
       return true;
     }
     else{
       this.router.navigate([UrlConstants.LOGIN],{
         queryParams:{
           returnUrl:routerState.url
         }
       });
       return false;
     }
    }
}
