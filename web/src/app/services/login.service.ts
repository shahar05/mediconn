import { Injectable } from '@angular/core';
import { NetService } from './net.service';
import { BaseDoctorDetails } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private net: NetService) { }

  login(doctorDetails : BaseDoctorDetails){
    return this.net.login(doctorDetails);
  }

}
