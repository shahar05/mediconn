import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question, Patient } from 'src/app/models';
import { Language } from 'src/app/enum';
import { PatientService } from 'src/app/services/patient/patient.service';



@Component({
  selector: 'app-patient-create-update',
  templateUrl: './patient-create-update.component.html',
  styleUrls: ['./patient-create-update.component.scss']
})
export class PatientCreateUpdateComponent implements OnInit {
  numbers: Number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  msg: string;
  createOrEdit:string;
  languages : Language[];
  patient : Patient;
  constructor(  
    public dialogRef: MatDialogRef<PatientCreateUpdateComponent>,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: {
      patient: Patient, edit: boolean , languages : Language[]
    }
   ) { }

  ngOnInit(): void {
    this.languages = this.data.languages;
    this.patient = this.data.patient;
    this.createOrEdit = this.data.edit ? "edit" : "Create";
  }

  cancel(){
      this.dialogRef.close(null);
  }

  submit(){
    if( !this.isGoodPatient(this.patient)){
        //alert(this.msg);
        return;
    }

    if(this.data.edit){
      this.editPatient();
    }else{

        this.createPatient();

    }

    
  }

  editPatient(){
    this.patientService.updatePatient(this.patient).subscribe((patient)=>{
      this.dialogRef.close(patient);
    } ,  (err)=>{
      this.msg = "phoneNumberExists";
      console.log(err);
      
    })

  }

  createPatient(){
      this.patientService.createNewPatient(this.patient).subscribe((patient)=>{
        this.dialogRef.close(patient);
      },(err)=>{
        this.msg = "phoneNumberExists";
      console.log(err);
      })
  }


  isGoodPatient(patient: Patient): boolean {

    if(   / /.test(this.patient.lastName)  || / /.test(this.patient.firstName)){
      this.msg = "Nospacesallowed"
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(this.patient.lastName) || !/^[a-zA-Z]+$/.test(this.patient.firstName)) {
      this.msg = "mustcontainsonlyenglishlettrs"
      return false;
    }
    if (!/[0-9]{3}-?[0-9]{7}$/.test(this.patient.phoneNumber)) {
      this.msg = "phonenumberpatternisincorrect"
      return false;
    }
    if (!this.patient.language) {
      this.msg = "mustcontainslanguage"
      return false;
    }
    if ((this.patient.startHour && this.patient.endHour) && (this.patient.endHour <= this.patient.startHour || this.patient.startHour < 0 || this.patient.startHour > 23
      || this.patient.endHour > 23 || this.patient.endHour < 0)) {
      this.msg = "EndHourandStartHourshouldhavevaluebetween"
      return false;
    }
    if( !this.patient.creatorID ){
        //this.msg = "No Creator ID!"
        return false;
    }
    this.patient.lastName = this.patient.lastName.charAt(0).toUpperCase() + this.patient.lastName.slice(1);
    this.patient.firstName = this.patient.firstName.charAt(0).toUpperCase() + this.patient.firstName.slice(1);

    return true;
  }
}
