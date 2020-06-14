import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question, QuestionText } from 'src/app/models';
import { FormControl } from '@angular/forms';
import { Language, Type } from 'src/app/enum';

@Component({
  selector: 'app-question-update-create',
  templateUrl: './question-update-create.component.html',
  styleUrls: ['./question-update-create.component.scss']
})
export class QuestionUpdateCreateComponent implements OnInit {
  selected = new FormControl(0);
  @Input() question: Question;
  @Input() questionNeedToUpdate: boolean;
  @Input() fromPopUp: boolean = false;
  @Output() sendQuestionClicked: EventEmitter<Question> = new EventEmitter<Question>();
  languages: Language[];
  langugeDictionary: { [key: string]: any } = {};
  constructor() { }

  ngOnInit(): void {
    this.languages = this.mapToLanguages(this.question.textArr);
      if(this.fromPopUp){
        this.putTextInDictionary();
      }
    
  }
  putTextInDictionary(){
    this.question.textArr.forEach((txt : QuestionText)=>{
        this.langugeDictionary[txt.language] = txt.text;
    })
  }
  mapToLanguages(textArr: QuestionText[]) {
    return textArr.map((t) => t.language)
  }
  resetDictionaty(){
      this.languages.forEach((lang)=>{
          this.langugeDictionary[lang]="";
      })
  }

  sendQuestion() {
    this.fillQuestionTextFromDictionary();
   
    if (!this.allLangugesExists()) return;
    if (!this.typeChecking()) return;
    this.resetDictionaty();
    this.sendQuestionClicked.emit(this.question);
  }
  fillQuestionTextFromDictionary() {
    let list: QuestionText[] = []

    for (let index = 0; index < this.languages.length; index++) {
      const element = this.languages[index];
      let e: QuestionText = { text: this.langugeDictionary[element], language: element };
      list.push(e);
    }
    
    this.question.textArr = list;
  }

  cancel() {
    this.sendQuestionClicked.emit(null);
  }

  typeChecking(): boolean {
    if (!this.question.questionType) {
      alert("Must have question type");
      return;
    }
    if (this.question.questionType === Type.Quantity) {
      if (!this.question.min || !this.question.max) {
        alert("Min And Max should be assign")
        return false;
      }
      if (this.question.min > this.question.max) {
        alert("MIN Should have lower value then MAX")
        return false;
      }
    }
    return true;
  }

  allLangugesExists() {
    const isNotEmpty =
      (questionText: QuestionText) => questionText.text === null || questionText.text.trim().length !== 0;
    if (!this.question.textArr.every(isNotEmpty)) {
      alert("Not all language exists!!!");
    }
    return this.question.textArr.every(isNotEmpty);
  }
  headline() {
    let def: string = this.question.isDefault ? "Default" : "";
    let createOrUpdate: string = this.questionNeedToUpdate ? "Update" : "Create";
    return createOrUpdate + "  " + def
  }
}
