import { Injectable } from '@angular/core';
import { NetService } from '../net/net.service';
import { BaseQuestion } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private net: NetService) { }

  getQuestionsByPatientID(patientID: string) {
    return this.net.getQuestionsByPatientID(patientID);
  }

  postDefaultQuestion(question: BaseQuestion) {
    return this.net.postDefaultQuestion(question);

  }

  getDefaultQuestions() {
    return this.net.getDefaultQuestions();
  }

}
