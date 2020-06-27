import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question, Patient } from 'src/app/models';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuestionUpdateCreateComponent } from '../question-update-create/question-update-create.component';

@Component({
  selector: 'app-question-wrapper',
  templateUrl: './question-wrapper.component.html',
  styleUrls: ['./question-wrapper.component.scss']
})
export class QuestionWrapperComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QuestionUpdateCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      question: Question, questionNeedToUpdate: boolean
    },
    private questionService: QuestionService
  ) { }

  ngOnInit(): void { }

  sendQuestion(newQuestion: Question) {
    this.dialogRef.close(newQuestion);
  }

}
