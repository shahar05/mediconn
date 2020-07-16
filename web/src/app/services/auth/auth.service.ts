import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local/local-storage.service';
import { LocalStorageKey } from '../../enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = '';
  private isAuth : boolean = false;
  constructor(private localstoragService: LocalStorageService) { }

  setToken(token: string = '') {
    this.token = token;
  }
  getToken() {
    if (!this.token) {
      const lsToken = this.localstoragService.getItem(LocalStorageKey.Token, false);
      if (lsToken) {
        this.token = lsToken;
      }
    }
    return this.token;
  }

  setIsAuth( isAuth : boolean ){
    this.isAuth = isAuth;
  }
  getIsAuth(){
    return this.isAuth;
  }

}
