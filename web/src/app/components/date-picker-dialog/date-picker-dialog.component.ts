import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-date-picker-dialog',
  templateUrl: './date-picker-dialog.component.html',
  styleUrls: ['./date-picker-dialog.component.scss']
})
export class DatePickerDialogComponent implements OnInit {

  dateStart : Date;
  dateEnd : Date;
  constructor(
    public dialogRef: MatDialogRef<DatePickerDialogComponent>
  ) { }

  ngOnInit(): void {
  }


  cancel(){
    this.dialogRef.close();
  }
  sendDates(){

    if(this.dateEnd < this.dateStart)return;

    this.dialogRef.close({dateStart : this.dateStart , dateEnd : this.dateEnd});
    

  }
}


