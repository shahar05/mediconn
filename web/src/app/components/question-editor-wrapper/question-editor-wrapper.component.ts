import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseQuestion, Question } from 'src/app/models';
import { QuestionService } from 'src/app/services/question/question.service';


@Component({
  selector: 'app-question-editor-wrapper',
  templateUrl: './question-editor-wrapper.component.html',
  styleUrls: ['./question-editor-wrapper.component.scss']
})
export class QuestionEditorWrapperComponent implements OnInit {

  constructor(
    
    public dialogRef: MatDialogRef<QuestionEditorWrapperComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { 
                edit : boolean , languages : string , creatorID : string 
               },
               private questionService : QuestionService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    
  }

  createNewQuestion(newQuestion : BaseQuestion){
       
   console.log(newQuestion);
   newQuestion.isDefault = false;
   newQuestion.creatorID = this.data.creatorID;
   
    // this.questionService.postDefaultQuestion(newQuestion).subscribe((response : Question) => {
    //   console.log("suscess"); console.log(response);
    // }, (err) => {
    //   console.log("error"); console.log(err);
    // })
    
  
  }
}
