import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseDoctorDetails } from '../models';
import { LocalStorageKey } from '../enum';




const BaseURL: string = "http://localhost:3000/";

@Injectable({
  providedIn: 'root'
})


export class NetService {
 


  constructor(private http: HttpClient) { }


  login(doctorDetails: BaseDoctorDetails) {
    return this.http.post(BaseURL + "login", doctorDetails);
  }

  getPatients() {
    return this.http.get(BaseURL + "patients/" + JSON.parse(localStorage.getItem(LocalStorageKey.Doctor)));
  }
  getPatientByID(patientID: String) {
    return this.http.get(BaseURL + "patient/" + patientID);
  }

  getQuestionsByPatientID(patientID : String){
    return this.http.get('/patients/'+patientID+'/questions');
  }



}


