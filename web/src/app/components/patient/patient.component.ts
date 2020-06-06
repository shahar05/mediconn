import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  @Input() patient : Patient;
  constructor(private router : Router) { }

  ngOnInit(): void {
    let  l = this.patient.phoneNumber.length;
     this.patient.phoneNumber = this.patient.phoneNumber.substring(0,3) + "-" + this.patient.phoneNumber.substring(3,l);
  }


  navigateToPatientProfile(){
    this.router.navigate([ "patients/" + this.patient._id ]);
}
}
