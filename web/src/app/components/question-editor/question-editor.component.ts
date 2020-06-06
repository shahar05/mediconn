import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Language, Type } from 'src/app/enum';
import { FormControl } from '@angular/forms';
import { BaseQuestion, Question, QuestionText } from 'src/app/models';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})

export class QuestionEditorComponent implements OnInit {

  @Input() languages: Language[];
  selected = new FormControl(0);
  texts: any = { Hebrew: null, English: null, Russian: null, French: null, Arabic: null };
  question: BaseQuestion = { textArr: [], isDefault: true, creatorID: null, questionType: null };

  @Output() createClicked : EventEmitter<BaseQuestion> = new EventEmitter<BaseQuestion>();

  constructor() {  }

  ngOnInit(): void { }

  createDefaultQuestion(){

    if (!this.allLangugesExists()) {
      alert("Not all language exists!!!")
      return;
    }

    if (this.question.questionType === Type.Quantity) {
      if (!this.question.min || !this.question.max) {
        console.log(this.question);
        alert("Min And Max should be assign")
        return;
      }
      if (this.question.min > this.question.max) {
        alert("MIN Should have lower value then MAX")
        return;
      }
    }
    this.insertQuestions();
    
    this.createClicked.emit(this.question);

  }

  insertQuestions() {
    this.languages.forEach((lang) => {
      let textQuestion: QuestionText = { language: lang, text: this.texts[lang] }
      this.question.textArr.push(textQuestion)
    });
  }

   allLangugesExists() {
    let numOfQuestions = 0;
    this.languages.forEach(element => { if (this.texts[element]) numOfQuestions++; });
    return this.languages.length === numOfQuestions;
  }

}
