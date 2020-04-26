import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseDoctorDetails } from '../models';

const BaseURL : string = "http://localhost:3000/";

@Injectable({
  providedIn: 'root'
})


export class NetService {


  constructor(private http : HttpClient) { }


  login(doctorDetails : BaseDoctorDetails) {      
    return this.http.post(BaseURL + "login" ,doctorDetails );
  }

  getPatients(doctorID : String){
    return this.http.get(BaseURL + "patients/" + doctorID);
  }

}


