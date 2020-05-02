import { Injectable } from '@angular/core';
import { NetService } from './net.service';
import { BasePatient } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  constructor(private net : NetService) { }

  getPatients(){
      return this.net.getPatients();
  }
  getPatientByID(patientID: String) {
    return this.net.getPatientByID(patientID);
  }

  createNewPatient(basePatient : BasePatient){
    
    return this.net.createNewPatient(basePatient);
}


}
