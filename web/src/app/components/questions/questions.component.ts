import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @Input() questions : Question[];
  @Input() patientLanguage : String;
  constructor() { }

  ngOnInit(): void {
  }

}
