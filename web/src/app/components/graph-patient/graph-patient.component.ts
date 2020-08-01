import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-graph-patient',
  templateUrl: './graph-patient.component.html',
  styleUrls: ['./graph-patient.component.scss']
})



export class GraphPatientComponent implements OnInit {


  patientID : string;
  startime : string;
  endtime : string;
  width: number = null;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d']
  };

  date : Date = new Date()

  view: any[];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Answer';
  timeline: boolean = false;
  arr;
    

  constructor( public dialogRef: MatDialogRef<DialogAlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { arr : any ,headline : string }
    ) { }

  ngOnInit(): void {
    this.width = window.innerWidth - 400;
    this.view = [ this.width , this.width/3];

    this.arr = this.data.arr;
    

  }

  exit(){
    this.dialogRef.close();
  }

}
