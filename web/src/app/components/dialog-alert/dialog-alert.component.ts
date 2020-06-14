import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.scss']
})
export class DialogAlertComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAlertComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { isDefault : boolean }
  ) { }

  ngOnInit(): void { }

  onCancel(){
    this.dialogRef.close(false);

  }
  onDelete(){
    this.dialogRef.close(true);
  }
}
