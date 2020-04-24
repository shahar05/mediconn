import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseDoctorDetails } from '../models';

const BaseURL : string = "../assets/seed/";

@Injectable({
  providedIn: 'root'
})


export class NetService {


  constructor(private http : HttpClient) { }


  login(doctorDetails : BaseDoctorDetails) {      
     return  this.http.get(BaseURL+"doctors.json")    
  }

}


// BaseURL + "\doctors.json"