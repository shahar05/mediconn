import { Component, OnInit, Inject } from '@angular/core';
import { MedicalAdditions } from 'src/app/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddPopupType } from 'src/app/enum';

@Component({
  selector: 'app-add-medication-popup',
  templateUrl: './add-medication-popup.component.html',
  styleUrls: ['./add-medication-popup.component.scss']
})
export class AddMedicationPopupComponent implements OnInit {
  medicalAddition: MedicalAdditions;
  pageTitle1: string;
  pageTitle2: string;
  constructor(public dialogRef: MatDialogRef<AddMedicationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { medicalAddition: MedicalAdditions, type: AddPopupType }) { }

    msg;
  ngOnInit(): void {

    if (this.data.medicalAddition) {
      this.medicalAddition = this.data.medicalAddition;
    } else {
      this.initMedicalAddition();
    }

    this.setPageTitle();

  }

  setPageTitle() {

    if (this.data.medicalAddition) {
      this.pageTitle1 = 'Update';
    } else {
      this.pageTitle1 = 'Create';
    }
    if (this.data.type === AddPopupType.Medication) {
      this.pageTitle2 = 'Medication';
    } else {
      this.pageTitle2 =  'Treatment';
    }

  }

  initMedicalAddition() {
    this.medicalAddition = {
      description: '',
      additionType: this.data.type,
      name: ''
    };
  }
  close() {
    this.dialogRef.close(null);
  }

  submitForm() {
    if (this.medicalAddition.name && this.medicalAddition.description) {
      this.dialogRef.close(this.medicalAddition);
    }else{
      this.msg = "BothFieldsAreRequired";
    }
  }
}
