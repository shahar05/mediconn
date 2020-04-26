import { Injectable } from '@angular/core';
import { Doctor, Admin, BaseDoctorDetails } from '../models';
import { NetService } from './net.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  doctor : Doctor;
  admin : Admin;
  constructor(private net : NetService) { }


  login(doctorDetailes : BaseDoctorDetails){
      this.net.login( doctorDetailes).subscribe((doctor : Doctor)=>{
            this.doctor = doctor;
      })
  }
  getDoctorID(){
    return this.doctor.id;
  }
  getDoctor(){
    return this.doctor;
  }


}
