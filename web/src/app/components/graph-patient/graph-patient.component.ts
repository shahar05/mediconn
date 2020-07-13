import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ActivatedRoute } from '@angular/router';

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
    

  constructor( private patientService : PatientService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.width = window.innerWidth - 200;
    this.view = [ this.width , this.width/3];

    this.patientID = this.route.snapshot.paramMap.get('id');
    this.startime = this.route.snapshot.paramMap.get('startime');
    this.endtime = this.route.snapshot.paramMap.get('endtime');


    this.patientService.getQuestionResults( this.patientID , this.startime ,this.endtime ).subscribe(( arr : any )=>{
      this.arr = arr;
    })
  }

}
