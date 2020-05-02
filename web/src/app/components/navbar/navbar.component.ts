import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientEditorComponent } from '../patient-editor/patient-editor.component';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private patientService: PatientService) { }

  ngOnInit(): void {
  }

  openPatientEditor() {
    const dialogRef = this.dialog.open(PatientEditorComponent, {
      width: '35%',
      height: '500px',
      disableClose: true,
      data: "Edit"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.navToViewPatient();
    });
  }

  navToViewPatient() {
    this.router.navigate(["patients"]);
  }

  navToDefaultQuestion() {
    this.router.navigate(["defaultQuestion"]);
  }

  logout() {
    this.router.navigate([""]);
  }

}

