import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from 'src/app/models';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  @Input() patients : Patient[];
  @Input() fromPopUp : boolean;
  @Output() addPatientClicked : EventEmitter<Patient> = new EventEmitter<Patient>();

  constructor() { }

  ngOnInit(): void {
  }


  addPatientToGraph($event){
 
    
    
    this.addPatientClicked.emit($event);
  }

}
