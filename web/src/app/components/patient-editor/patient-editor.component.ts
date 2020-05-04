import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Language, LocalStorageKey } from 'src/app/enum';
import { Patient, BasePatient, Doctor } from 'src/app/models';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import { LocalStorageService } from 'src/app/services/local/local-storage.service';

@Component({
  selector: 'app-patient-editor',
  templateUrl: './patient-editor.component.html',
  styleUrls: ['./patient-editor.component.scss']
})
export class PatientEditorComponent implements OnInit {

  numbers : Number[] = [ 0 ,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  msg : string;
  languages: Language[];
  doctor: Doctor;
  patient: BasePatient = { firstName: "", lastName: "", phoneNumber: "", creatorID: ""};
  constructor( private userService: UserService, private patientService: PatientService, public dialogRef: MatDialogRef<PatientEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.userService.getDoctor().subscribe((doctor: Doctor) => {
      this.languages = doctor.languages;
      this.doctor = doctor;
    })
  }

  onNoClick(): void {

    this.dialogRef.close(false);

  }
  onCreateClick() {

      if(!this.isGoodPatient(this.patient)){
          return;
      }

    this.patientService.createNewPatient(this.patient).subscribe((response: any) => {
      console.log("=========Successes=======");
      console.log(response);
      this.dialogRef.close(true);
    }, (err) => {
      console.log("=========err=======");
      console.log(err);
    })
  }

    isGoodPatient(patient : BasePatient):boolean{
      if( !/^[a-zA-Z]+$/.test(this.patient.lastName)  ||  !/^[a-zA-Z]+$/.test(this.patient.firstName)){
        this.msg = "must contains only lettrs"
        return false;
      }
      if(!/[0-9]{3}-?[0-9]{7}$/.test(this.patient.phoneNumber)){
        this.msg = "phone number pattern is incorrect"
        return false;
      }
      if(!this.patient.language){
        this.msg = "must contains language"
        return false;
      }
      if (  (this.patient.startHour && this.patient.endHour)  && (  this.patient.endHour < this.patient.startHour || this.patient.startHour <  0 || this.patient.startHour > 23
        ||  this.patient.endHour  > 23 ||    this.patient.endHour < 0)) {
          this.msg = " End Hour and Start Hour should have value  between 0 to 23"
        return false;
      }
      
      this.patient.lastName = this.patient.lastName.charAt(0).toUpperCase() + this.patient.lastName.slice(1);
      this.patient.firstName = this.patient.firstName.charAt(0).toUpperCase() + this.patient.firstName.slice(1);
      this.patient.creatorID = this.doctor._id;
      return true;
    }
}


// [Language.Hebrew, Language.English, Language.Arabic, Language.French, Language.Russian];