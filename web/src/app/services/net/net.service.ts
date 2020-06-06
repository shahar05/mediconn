import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseDoctorDetails, BasePatient, MedicalAdditions } from '../../models';
import { LocalStorageKey } from '../../enum';





const BaseURL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})


export class NetService {
  constructor(private http: HttpClient) { }

  login(doctorDetails: BaseDoctorDetails) {
    return this.http.post(`${BaseURL}/login`, doctorDetails);
  }

  getPatients(doctorId: string) {
    return this.http.get(`${BaseURL}/doctor/${doctorId}/patient`);
  }
  getPatientByID(patientID: string) {
    return this.http.get(`${BaseURL}/patient/${patientID}`);
  }

  getDoctor() {
    return this.http.get(`${BaseURL}/doctor/current`);
  }

  getDefaultQuestions() {
    return this.http.get(`${BaseURL}/question/default`);
  }

  postDefaultQuestion(question) {
    return this.http.post(`${BaseURL}/question/default`, question);
  }


  createNewPatient(basePatient: BasePatient) {
    return this.http.post(`${BaseURL}/patient`, basePatient);
  }


  createMedicalAdditions(medicalAddition: MedicalAdditions) {
    return this.http.post(`${BaseURL}/medical-additions`, { medicalAddition });
  }
  
}


