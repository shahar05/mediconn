import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  @Input() patient : Patient;
  @Input() fromPopUp : boolean;
  @Output() addPatientClicked : EventEmitter<Patient> = new EventEmitter<Patient>();
  color : string = "primary"
  constructor(private router : Router) { }

  ngOnInit(): void {}


  navigateToPatientProfile(){
    this.router.navigate([ "patients/" + this.patient._id ]);
}


addPatientToGraph(){
  this.color = (  this.color === "accent" ? "primary" : "accent") ;
  this.addPatientClicked.emit(this.patient);
}
}
//accent