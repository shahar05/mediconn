import { Injectable } from '@angular/core';
import { Doctor, Admin, BaseDoctorDetails } from '../models';
import { NetService } from './net.service';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKey } from '../enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  token : String;
  doctor : Doctor;
  admin : Admin;
  constructor(private net : NetService ,private localStorageService : LocalStorageService) { }


  tokenSaver(response: any) {
 if(response.type === "doctor"){
  this.setDoctor(response.object);
  this.localStorageService.setItem(LocalStorageKey.Doctor , this.doctor._id);
  
 }else{
  this.setAdmin(response.object);
  this.localStorageService.setItem(LocalStorageKey.Admin , this.admin._id);
 }

  }

  login(doctorDetailes : BaseDoctorDetails){
      return this.net.login(doctorDetailes);
  }

  setToken(token: String):void {
    this.token = token;
  }

  setAdmin(admin: Admin):void {
    this.admin = admin;

  }
  setDoctor(doctor: Doctor) :void{
    this.doctor = doctor;
  }
  getDoctorID() :  String{
    return this.doctor._id;
  }
  getDoctor() : Doctor{
    return this.doctor;
  }


}
