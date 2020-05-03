import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKey } from '../enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';

  constructor(private localstoragService: LocalStorageService) { }

  setToken(token: string = '') {
    this.token = token;
  }
  getToken() {
    if (!this.token) {
      let lsToken = this.localstoragService.getItem(LocalStorageKey.Token, false);
      console.log(lsToken)
      if (lsToken) {
        this.token = lsToken;
      }
    }
    return this.token;
  }
}
