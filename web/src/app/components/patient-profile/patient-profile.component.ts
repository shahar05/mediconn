import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  patientID: String;
  patient:Patient;
  constructor(private patientService : PatientService ,  private route : ActivatedRoute ) { }

  ngOnInit(): void {
    this.patientID = this.route.snapshot.paramMap.get('id');
      this.patientService.getPatientByID(this.patientID).subscribe((patient:Patient)=>{
          this.patient = patient;
          console.log(this.patient);
          
      })
  }

}
