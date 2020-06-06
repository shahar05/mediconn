import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Language, Type } from 'src/app/enum';
import { Doctor, Question, QuestionText, BaseQuestion } from 'src/app/models';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-default-question',
  templateUrl: './default-question.component.html',
  styleUrls: ['./default-question.component.scss']
})
export class DefaultQuestionComponent implements OnInit {
  
  languages: Language[];
  doctor: Doctor;
  question: BaseQuestion = { textArr: [], isDefault: true, creatorID: null, questionType: null };
  questions: Question[];
  

  constructor(private userService: UserService, private questionService: QuestionService) { }

  ngOnInit(): void {

    this.questionService.getDefaultQuestions().subscribe((defaultQuestions: Question[]) => {
      this.questions = defaultQuestions;
    }, (err) => {
      console.log(err);
    })

    this.userService.getDoctor().subscribe((doctor: Doctor) => {
      this.languages = doctor.languages;
      this.doctor = doctor;
      this.question.creatorID = this.doctor._id;
      
    })
  }

  createQuestion( newQuestion : BaseQuestion ){
    
    console.log("now doc");
    console.log(this.doctor);
    
    
    newQuestion.creatorID = this.doctor._id;
    this.questionService.postDefaultQuestion(newQuestion).subscribe((response : Question) => {
      console.log("suscess"); console.log(response);
        this.questions.push(response);
      
    }, (err) => {
      console.log("error"); console.log(err);
    })
      
  }

}
