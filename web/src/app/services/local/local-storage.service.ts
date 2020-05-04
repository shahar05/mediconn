import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../../enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  setItem(key: LocalStorageKey, value): void {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
  getItem(key: LocalStorageKey, shouldParse = true): any {

    let value = localStorage.getItem(key);
    return shouldParse ? JSON.parse(value) : value; 
    
  }




}
