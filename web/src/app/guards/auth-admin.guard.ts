import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local/local-storage.service';
import { LocalStorageKey } from '../enum';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService , private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isAuth : boolean= !!this.localStorageService.getItem( LocalStorageKey.Admin );
            
      return   isAuth ? true : this.router.parseUrl('/');
  }
  
}
