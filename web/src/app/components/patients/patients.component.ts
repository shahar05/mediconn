import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  @Input() patients : Patient[];
  constructor() { }

  ngOnInit(): void {
  }

  navigateToPatientProfile(){
    alert("profile")
  //  this.router.navigate([ "patients/profile/" + this.patient.id ]);
}

}
