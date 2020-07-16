import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-expired-dialog',
  templateUrl: './expired-dialog.component.html',
  styleUrls: ['./expired-dialog.component.scss']
})
export class ExpiredDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ExpiredDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public d: {title : string , body : string , cancel : boolean , closeButtonText:string }

  ) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.dialogRef.close(false);
  }

  onClose(){
    this.dialogRef.close(true);
  }

}
