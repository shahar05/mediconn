

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local/local-storage.service';
import { LocalStorageKey } from '../enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService , private router : Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // IMPORTANT TODO: need to check whether or not the Token has expired  
      let isAuth : boolean= !!this.localStorageService.getItem( LocalStorageKey.Doctor );
            
      return   isAuth ? true :     this.router.parseUrl('/');
    
  }
  
}
