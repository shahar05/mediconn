import { Component, OnInit, Input } from '@angular/core';
import { Question , QuestionText} from 'src/app/models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question : Question;
  @Input() patientLanguage : string;
  text : string = "juli";
  constructor() { }

  ngOnInit(): void {

  }

  questionDisplay(){
  
    this.question.textArr.forEach(element => {
        if(element.language === this.patientLanguage){
          this.text = element.text;
        }
    });

    return this.text;

  }


}
