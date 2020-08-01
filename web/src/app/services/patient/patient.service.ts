import { Injectable } from '@angular/core';
import { NetService } from '../net/net.service';
import { BasePatient, MedicalAdditions, Question, Patient } from '../../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {




  private message = new BehaviorSubject(null);
  sharedMessage = this.message.asObservable();

  constructor(private net: NetService) { }
  clearSharedMessage() {
    this.message = new BehaviorSubject(null);
    this.sharedMessage = this.message.asObservable();
  }
  notifyAddPatient(p: Patient) {
     this.message.next(p);
  }
  sendSms(link: string, phoneNumber: string) {
    return this.net.sendSms(link , phoneNumber);
  }
  getQuestionResultsOfPatients(id: string, patientsId: string[], dates: { dateStart: Date; dateEnd: Date; }) {

    return this.net.getQuestionResultsOfPatients(id, patientsId, dates);

  }
  getQuestionResults(patientID: string, startime: string, endtime: string) {
    return this.net.getQuestionResults(patientID, startime, endtime);
  }

  deletePatient(patientID: string) {
    return this.net.deletePatient(patientID);
  }


  deleteQuestionFromPatient(questionID: string, patientID: string) {
    return this.net.deleteQuestionFromPatient(questionID, patientID);
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
  createNewQuestionToPatient(question: Question, patientID: string) {
    return this.net.createNewQuestionToPatient(question, patientID);
  }


  deleteMedicalAdditions(id: string) {
    return this.net.deleteMedicalAdditions(id);
  }
  editMedicalAdditions(medicalAddition: MedicalAdditions) {
    return this.net.editMedicalAdditions(medicalAddition);
  }

}
