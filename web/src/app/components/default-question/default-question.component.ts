import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Language, Type } from 'src/app/enum';
import { Doctor, Question, QuestionText, width, height } from 'src/app/models';
import { QuestionService } from 'src/app/services/question/question.service';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { QuestionWrapperComponent } from '../question-wrapper/question-wrapper.component';
import { ViewPatientsComponent } from '../view-patients/view-patients.component';
import { SelectPatientsComponent } from '../select-patients/select-patients.component';

@Component({
  selector: 'app-default-question',
  templateUrl: './default-question.component.html',
  styleUrls: ['./default-question.component.scss']
})


export class DefaultQuestionComponent implements OnInit {

  languages: Language[];
  doctor: Doctor;
  question: Question = { textArr: [], isDefault: true, creatorID: null, questionType: null };
  questions: Question[];
  questionNeedToUpdate: boolean = false;

  constructor(private dialogService: DialogService, private userService: UserService, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.initDoctor();
  }

  deleteQuestion(questionToDelete: Question) {
    this.dialogService.openDialog(DialogAlertComponent, { isDefault: true }, width, height)
      .afterClosed().subscribe((toDelete: boolean) => {
        if (toDelete)
          this.questionService.deleteDefaultQuestion(questionToDelete._id).subscribe(() => {
            let i: number = this.questions.findIndex(q => q._id === questionToDelete._id);
            this.questions.splice(i, 1);
          }, (err) => {
            console.log(err);
          })
      })
  }

  editQuestion(questionToEdit: Question) {

    this.dialogService
      .openDialog(QuestionWrapperComponent, { question: questionToEdit, questionNeedToUpdate: true })
      .afterClosed().subscribe((newQuestion: Question) => {
        if (newQuestion)
          this.questionService.updateQuestion(newQuestion).subscribe((response: any) => {
            // Question is updated "itself"
            // because it actually updated the values of the same reference
          })

      })

  }

  createDefaultQuestion(newQuestion: Question) {

    this.questionService.postDefaultQuestion(newQuestion)
      .subscribe((response: Question) => {
        this.resetQuestion();
        this.questions.push(response);
      }, (err) => {
        console.log("error"); console.log(err);
      })

  }

  showGraph(question: Question) {

    this.dialogService.openDialog(SelectPatientsComponent, { question: question }, "30%").afterClosed()
      .subscribe(() => {

      })

  }

  initDoctor() {

    this.userService.getDoctorByID().subscribe((doctor: Doctor) => {
      this.initVars(doctor);
      this.initDefaultQuestions();
    })
  }

  initVars(doctor: Doctor) {
    this.doctor = doctor;
    this.languages = doctor.languages;
    this.question.creatorID = this.doctor._id;
    this.initQuestionText();
  }

  resetQuestion() {
    this.question.questionType = null;
    this.resetQuestionText();
  }
  resetQuestionText() {
    for (let index = 0; index < this.question.textArr.length; index++) {
      const txt: QuestionText = this.question.textArr[index];
      txt.text = "";
    }
  }
  initQuestionText() {
    for (let index = 0; index < this.languages.length; index++) {
      let language: Language = this.languages[index];
      let txt: QuestionText = { text: "", language: language }
      this.question.textArr.push(txt)
    }
  }
  initDefaultQuestions() {
    this.questionService.getDefaultsQuestions(this.doctor._id)
      .subscribe((defaultQuestions: Question[]) =>
        this.questions = defaultQuestions,
        (err) =>
          console.log(err)
      );
  }
}
