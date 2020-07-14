import { Component, OnInit, Inject } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewPatientsComponent } from '../view-patients/view-patients.component';
import { Patient, Question, QuestionText, Doctor } from 'src/app/models';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DatePickerDialogComponent } from '../date-picker-dialog/date-picker-dialog.component';
import { GraphPatientComponent } from '../graph-patient/graph-patient.component';

@Component({
  selector: 'app-select-patients',
  templateUrl: './select-patients.component.html',
  styleUrls: ['./select-patients.component.scss']
})
export class SelectPatientsComponent implements OnInit {
  phoneNumber: string;
  searchKey: string;
  patients: Patient[];
  patientsTemp: Patient[];
  doctor : Doctor;
  patientsToGraph: Patient[] = [];
  dates: { dateStart: Date, dateEnd: Date };
  constructor(
    private patientService: PatientService,
    private userService: UserService,
    private dialogService : DialogService,
    public dialogRef: MatDialogRef<SelectPatientsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { question: Question }
  ) { }

  ngOnInit(): void {
    const doctorId: string = this.userService.getCurrentDoctorDetails();
    this.userService.getDoctor().subscribe((doc:Doctor)=>{this.doctor = doc})
    this.patientService.getPatients(doctorId).subscribe((patients: Patient[]) => {

      patients.map(p => { p.phoneNumber = p.phoneNumber.substring(0, 3) + "-" + p.phoneNumber.substring(3, p.phoneNumber.length) });

      this.patients = patients;
      this.patientsTemp = patients;

    });
  }

  moveToGraphPage(){

    let patientsId = this.patientsToGraph.map( p => p._id )

    this.patientService.getQuestionResultsOfPatients(this.data.question._id , patientsId ,  this.dates  ).subscribe((arr:any)=>{
        this.dialogRef.close();
         
        let text : QuestionText //= this.data.question.textArr.find( ( t : QuestionText)=>{ (t.language + "") === (this.doctor.mainLanguage +"")  } )
       this.data.question.textArr.forEach((t:QuestionText )=> {
            if(  (t.language + "").trim() === (this.doctor.mainLanguage +"").trim() ){
              text = t;
            }
        });
        this.dialogService.openDialog( GraphPatientComponent ,{arr:arr ,headline : text.text },"80%"  ).afterClosed().subscribe(()=>{})
      
    });

  }

  addPatientToGraph(patient : Patient){
    
    let index : number =   this.patientsToGraph.findIndex(  (p : Patient)=>{ patient._id === p._id   } )

    if(index === -1){
      this.patientsToGraph.push(patient)
    }else{
      this.patientsToGraph.splice(index , 1);
    }

}
chooseCalander(){

    this.dialogService.openDialog(  DatePickerDialogComponent , {}  ).afterClosed().subscribe((dates: { dateStart: Date, dateEnd: Date })=>{
        this.dates = dates;
    })

}
filter() {

  let strNoTrim: string[] = this.searchKey.split(" ");
  let str: string = this.searchKey.trim().replace(/-/gi, "");
  let p: Patient[] = [];
  if (str && str.length != 0) {

    if (/[0-9]+$/.test(str)) {
      p = this.searchByPhoneNumber(str)
    }
    else {

      p = this.searchFullName(this.searchKey);

      if (!p.length) {
        p = this.searchByName(str);
        let i = 0;
        while (!p.length || i < strNoTrim.length) {
            if(strNoTrim[i].length)
              p = this.searchByName(strNoTrim[i++]);
             else
              i++; 
        }
      }
    }
  }


  //p.map(pt => pt.phoneNumber.replace(/-/gi, ""))
  // p.map(pt => pt.phoneNumber.substring(0, 3) + "-" + pt.phoneNumber.substring(3, pt.phoneNumber.length))
  this.patients = p;
}

searchByPhoneNumber(searchingNumber: string) {
  let patientsFilter: Patient[] = [];

  this.patientsTemp.forEach(p => {
    if (p.phoneNumber.replace(/-/gi, "").includes(searchingNumber)) {
      p.phoneNumber = p.phoneNumber.replace(/-/gi, "");
      p.phoneNumber = p.phoneNumber.substring(0, 3) +
        "-" + p.phoneNumber.substring(3, p.phoneNumber.length);
      patientsFilter.push(p);
    }
  });
  return patientsFilter;
}

searchFullName(fullname: string) {
  let patientsFilter: Patient[] = [];
  fullname = fullname.toLowerCase();
  this.patientsTemp.forEach(patient => {

    let patientName =
      patient.firstName.toLocaleLowerCase() +
      patient.lastName.toLocaleLowerCase();

    if (patientName.includes(fullname)) {
      patientsFilter.push(patient);
    }
  });
  return patientsFilter;
}


searchByName(patientName: string) {
  let patientsFilter: Patient[] = [];
  if (!/^[a-zA-Z]+$/.test(patientName)) return this.patientsTemp;

  patientName = patientName.toLowerCase();
  this.patientsTemp.forEach(patient => {

    if (patient.firstName.toLocaleLowerCase().includes(patientName)
      || patient.lastName.toLocaleLowerCase().includes(patientName)) {
      patientsFilter.push(patient);
    }
  });
  return patientsFilter;
}

}
