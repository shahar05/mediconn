import { Injectable } from '@angular/core';
import { NetService } from '../net/net.service';
import { BasePatient, MedicalAdditions } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  constructor(private net: NetService) { }

  getPatients(doctorId: string) {
    return this.net.getPatients(doctorId);
  }

  getPatientByID(patientID: string) {
    return this.net.getPatientByID(patientID);
  }

  createNewPatient(basePatient: BasePatient) {

    return this.net.createNewPatient(basePatient);
  }

  createMedicalAdditions(medicalAddition: MedicalAdditions) {
    return this.net.createMedicalAdditions(medicalAddition);
  }
}
