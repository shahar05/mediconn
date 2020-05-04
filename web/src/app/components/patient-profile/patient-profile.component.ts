import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  patientID: string;
  patient: Patient;
  constructor(private patientService: PatientService
    , private route: ActivatedRoute
    ,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.patientID = this.route.snapshot.paramMap.get('id');
    this.patientService.getPatientByID(this.patientID).subscribe((patient: Patient) => {
      this.patient = patient;
    })
  }

  deleteQuestion($event) {
    console.log($event);
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      width: '45%',
      height: '175px',
      disableClose: false,
      data: "Edit"
    });
  }


}
