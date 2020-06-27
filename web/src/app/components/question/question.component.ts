import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question, QuestionText } from 'src/app/models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Output() deleteClicked : EventEmitter<Question> = new EventEmitter<Question>();
  @Output() editClicked : EventEmitter<Question> = new EventEmitter<Question>();
  @Input() question: Question;
  @Input() patientLanguage: string;
  @Input() isNotDefaultPage : boolean;
  text: string = "How Many Times...";
  constructor() { }

  ngOnInit(): void {}

  questionDisplay() {
    this.question.textArr.forEach(element => {
      if (element.language === this.patientLanguage) {
        this.text = element.text;
      }
    });
    return this.text;
  }
  
  edit():void{
    this.editClicked.emit(this.question);
  }

  delete():void {
      this.deleteClicked.emit(this.question);
  } 
}

//@Output() itemClicked : EventEmitter<Ticket> = new EventEmitter<Ticket>();
