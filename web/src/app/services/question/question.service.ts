import { Injectable } from '@angular/core';
import { NetService } from '../net/net.service';
import { BaseQuestion } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private net: NetService) { }



  postDefaultQuestion(question: BaseQuestion) {
    return this.net.postDefaultQuestion(question);

  }

  getDefaultQuestions() {
    return this.net.getDefaultQuestions();
  }

}
