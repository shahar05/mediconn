import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @Output() deleteClicked: EventEmitter<Question> = new EventEmitter<Question>();
  @Input() questions: Question[];
  @Input() patientLanguage: String;
  constructor() { }

  ngOnInit(): void { }

  deleteQuestion($event) {
    this.deleteClicked.emit($event);
  }

}
