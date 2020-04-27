import { Injectable } from '@angular/core';
import { Doctor } from '../models';
import { LocalStorageKey } from '../enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  setItem(key: LocalStorageKey, value): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: LocalStorageKey): any {
    JSON.parse(localStorage.getItem(key)) ;
  }



}
