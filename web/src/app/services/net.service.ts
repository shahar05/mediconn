import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseDoctorDetails, BasePatient } from '../models';
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
    return this.http.get(BaseURL + "patients/" +   this.getDoctorID());
  }
  getPatientByID(patientID: String) {
    return this.http.get(BaseURL + "patient/" + patientID);
  }

  getQuestionsByPatientID(patientID : String){
    return this.http.get(BaseURL +'patients/'+patientID+'/questions');
  }

  createNewPatient(basePatient : BasePatient){
    
      return this.http.post(BaseURL + "patients", basePatient)
  }

  getDoctor() {
    return this.http.get(BaseURL + "doctors/" + this.getDoctorID() )
  }


  getDoctorID():string {
    return JSON.parse(localStorage.getItem(LocalStorageKey.Doctor));
  }

}


