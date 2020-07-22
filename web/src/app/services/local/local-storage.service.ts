import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../../enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
 

  constructor() { }



  removeAll(){
    localStorage.clear();
  }


  removeItem(key: LocalStorageKey) {
      localStorage.removeItem(key);
  }
  setItem(key: LocalStorageKey, value): void {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
    
  }
  getItem(key: LocalStorageKey, shouldParse : boolean  = false): any {

    let value = localStorage.getItem(key);

    if(shouldParse) value = JSON.parse(value) 
    return  value; 
    
  }




}
