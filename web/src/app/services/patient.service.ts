import { Injectable } from '@angular/core';
import { NetService } from './net.service';

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
}
