import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseDoctorDetails, BasePatient, MedicalAdditions, BaseQuestion, Question, Patient, Doctor } from '../../models';
import { LocalStorageKey } from '../../enum';
import { environment } from '../../../environments/environment';
const BaseURL = environment.serverURL;

@Injectable({
  providedIn: 'root'
})
    //${questionId}` , { patientsId:patientsId , dates:dates } 
export class NetService {


  constructor(private http: HttpClient) { }


  sendSms(link: string, phoneNumber: string) {
    return this.http.post(  `${BaseURL}/sms` , {link : link , phoneNumber : phoneNumber } )
  }

  getQuestionResultsOfPatients(questionId: string, patientsId: string[], dates: { dateStart: Date; dateEnd: Date; }) {
   return this.http.post( `${BaseURL}/records/${questionId}`  ,{patientsId:patientsId , dates:dates});

  }
  getQuestionResults(patientID: string, startime: string, endtime: string) {
    return this.http.get(`${BaseURL}/patient/${patientID}/records/${startime}/${endtime}` );
  }
  getDoctorByID(id : string){
    return this.http.get( `${BaseURL}/admin/doctor/${id}`  );
  }

  updateDoctor(doctor: Doctor) {
      return this.http.put( `${BaseURL}/admin/doctor`  , doctor);
  }
  deleteDoctor(doctorID: string) {
    return this.http.delete( `${BaseURL}/admin/doctor/${doctorID}`);
  }
  deletePatient(patientID: string) {
   return this.http.delete(`${BaseURL}/patient/${patientID}`)
  }
  createDoctor(doctor: Doctor) {
    return this.http.post(`${BaseURL}/admin/doctor` , doctor)
  }
  updatePatient(patient : Patient) {
    return this.http.put( `${BaseURL}/patient` , patient)
  }

  updateQuestion(question: Question) {
    return this.http.put( `${BaseURL}/question` , question);
  }
  getDoctors(adminID : string) {
    return this.http.get(`${BaseURL}/admin/${adminID}/doctor`);
  }

  deleteDefaultQuestion(questionID: string) {
    return this.http.delete( `${BaseURL}/question/default/${questionID}`);
  }
  deleteQuestionFromPatient(questionID: string, patientID: string) {
    return this.http.delete( `${BaseURL}/patient/${patientID}/question/${questionID}`);
  }

     createNewQuestionToPatient(question: BaseQuestion , patientID : string) {
        return this.http.post( `${BaseURL}/patient/${patientID}/question` , question)
  }

  login(doctorDetails: BaseDoctorDetails) {
    console.log(doctorDetails);
    
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

  getDefaultsQuestions(id : string) {
    return this.http.get(`${BaseURL}/question/defaults/${id}`);
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
  
  editMedicalAdditions(medication: MedicalAdditions) {
    return this.http.put( `${BaseURL}/medical-additions`  , medication  );
  }
  deleteMedicalAdditions(id: string) {
    return this.http.delete( `${BaseURL}/medical-additions/${id}`);
  }
}


