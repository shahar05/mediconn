import { Injectable } from '@angular/core';
import { NetService } from '../net/net.service';
import { BasePatient, MedicalAdditions, Question, Patient } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  




  constructor(private net: NetService) { }

  deletePatient(patientID: string) {
    return this.net.deletePatient(patientID);
  }


  deleteQuestionFromPatient(questionID: string, patientID: string) {
    return this.net.deleteQuestionFromPatient(questionID , patientID);
  }
  updatePatient(patient: Patient) {
    return this.net.updatePatient(patient);
  }
  
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
  createNewQuestionToPatient(question: Question ,  patientID : string){
    return this.net.createNewQuestionToPatient(question , patientID);
}


deleteMedicalAdditions(id: string) {
  return this.net.deleteMedicalAdditions( id);
}
editMedicalAdditions(medicalAddition: MedicalAdditions) {
  return this.net.editMedicalAdditions(  medicalAddition  );
}

}
