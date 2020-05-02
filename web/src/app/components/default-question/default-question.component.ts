import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Language } from 'src/app/enum';
import { Doctor, Question, QuestionText, BaseQuestion } from 'src/app/models';

@Component({
  selector: 'app-default-question',
  templateUrl: './default-question.component.html',
  styleUrls: ['./default-question.component.scss']
})
export class DefaultQuestionComponent implements OnInit {
  texts: any = { Hebrew: null, English: null, Russian: null, French: null, Arabic: null };
  selected = new FormControl(0);
  languages: Language[];
  doctor: Doctor;
  question: BaseQuestion = { textArr: [], isDefault: true, creatorID: null, questionType: null };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getDoctor().subscribe((doctor: Doctor) => {
      this.languages = doctor.languages;
      this.doctor = doctor;
      this.question.creatorID = this.doctor._id;
      this.languages.forEach((lang, index) => {
        let textQuestion: QuestionText = { language: lang, text: null }
        this.question.textArr.push(textQuestion)
      });

    })
  }

  createDefaultQuestion() {

    if (this.isAllLangugesExists()) {

    }
    


  }

  isAllLangugesExists() {
    let numOfQuestions = 0;
    this.languages.forEach(element => {   if(this.texts[element]) numOfQuestions++;  });
    return this.languages.length === numOfQuestions;
  }
}
