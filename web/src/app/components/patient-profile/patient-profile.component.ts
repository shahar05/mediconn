import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Patient, MedicalAdditions } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { AddMedicationPopupComponent } from '../add-medication-popup/add-medication-popup.component';
import { AddPopupType } from 'src/app/enum';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  patientID: string;
  patient: Patient;
  constructor(
    private patientService: PatientService,
    private dialogService: DialogService,
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.patientID = this.route.snapshot.paramMap.get('id');
    this.initPatient();
  }
  initPatient() {
    this.patientService.getPatientByID(this.patientID).subscribe((patient: Patient) => {
      this.patient = patient;
    });

  }


  deleteQuestion($event) {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      width: '45%',
      height: '175px',
      disableClose: false,
      data: 'Edit'
    });
  }


  addNewMedications() {
    this.openAddMedicationPopupComponent(AddMedicationPopupComponent, AddPopupType.Medication);
  }



  private openAddMedicationPopupComponent(component, type: AddPopupType) {
    this.dialogService.openDialog(component, { type })
      .afterClosed().subscribe((medicalAddition: MedicalAdditions) => {
        if (!medicalAddition) {
          return;
        }
        medicalAddition.patientId = this.patientID;
        medicalAddition.creatorId = this.userService.getCurrentDoctorDetails();
        
        this.patientService.createMedicalAdditions(medicalAddition).subscribe(() => {
          this.initPatient();
        });
      });
  }

  addNewTreatments() {
    this.openAddMedicationPopupComponent(AddMedicationPopupComponent, AddPopupType.Treatments);

  }

}
