import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor, Patient } from 'src/app/models';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-sms-dialog',
  templateUrl: './sms-dialog.component.html',
  styleUrls: ['./sms-dialog.component.scss']
})
export class SmsDialogComponent implements OnInit {

  link: string;
  msg : string;
  constructor(  public dialogRef: MatDialogRef<SmsDialogComponent> , 
    private patientService : PatientService,
    @Inject(MAT_DIALOG_DATA) private data: { doctor : Doctor , patient: Patient }
    ) { }

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close();
  }


  sendSMS(){

    this.link = "Message from doctor" + this.data.doctor.lastName +"  " + this.data.doctor.firstName +": " + this.link;

    this.patientService.sendSms(this.link , this.data.patient.phoneNumber).subscribe(()=>{

      alert("message successfully sent")
      this.dialogRef.close()

    }, (err)=>{
      this.msg = "Message send fail please try agian"
    })


      

  }

}
