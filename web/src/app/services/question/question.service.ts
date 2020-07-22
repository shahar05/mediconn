import { Injectable } from '@angular/core';
import { NetService } from '../net/net.service';
import { BaseQuestion, Question } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  constructor(private net: NetService) { }
  deleteDefaultQuestion(questionID: string) {
    return this.net.deleteDefaultQuestion(questionID);
  }

  updateQuestion(question : Question){
      return  this.net.updateQuestion(question);
  }

 
  postDefaultQuestion(question: BaseQuestion) {
    return this.net.postDefaultQuestion(question);
  }

  getDefaultQuestions() {
    return this.net.getDefaultQuestions();
  }

  getDefaultsQuestions(id : string){
    return this.net.getDefaultsQuestions(id);
  }

}
