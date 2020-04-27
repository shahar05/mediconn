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
  }


  navigateToPatientProfile(){
    this.router.navigate([ "patients/" + this.patient._id ]);
}
}
