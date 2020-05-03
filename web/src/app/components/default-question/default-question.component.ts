import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Language, Type } from 'src/app/enum';
import { Doctor, Question, QuestionText, BaseQuestion } from 'src/app/models';
import { QuestionService } from 'src/app/services/question.service';

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
  questions : Question[];
  constructor(private userService: UserService, private questionService: QuestionService) { }

  ngOnInit(): void {


      this.questionService.getDefaultQuestions().subscribe((defaultQuestions:Question[])=>{
        this.questions = defaultQuestions;
        console.log(this.questions);
        
      },(err)=>{
          console.log(err);
          
      })


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
    this.questionService.postDefaultQuestion(this.question).subscribe((response) => {
      console.log("suscess");
      console.log(response);

    }, (err) => {
      console.log("error");
      console.log(err);
    })

  }
  insertQuestions() {
    this.question.textArr.forEach((element) => {
      element.text = this.texts[element.language];
    });
  }

  allLangugesExists() {
    let numOfQuestions = 0;
    this.languages.forEach(element => { if (this.texts[element]) numOfQuestions++; });
    return this.languages.length === numOfQuestions;
  }
}
