import { Injectable } from '@angular/core';
import { NetService } from './net.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private net : NetService) { }

  getQuestionsByPatientID(patientID : String){
    return this.net.getQuestionsByPatientID(patientID);
  }

}
