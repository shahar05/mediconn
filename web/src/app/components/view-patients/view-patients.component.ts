import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import { Patient } from 'src/app/models';

@Component({
  selector: 'app-view-patients',
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.scss']
})
export class ViewPatientsComponent implements OnInit {
  phoneNumber: string;
  searchKey: string;
  patients: Patient[];
  patientsTemp: Patient[];

  constructor(private patientService: PatientService, private userService: UserService) { }

  ngOnInit(): void {
    const doctorId: string = this.userService.getCurrentDoctorDetails();
    this.patientService.getPatients(doctorId).subscribe((patients: Patient[]) => {
      this.patients = patients;
      this.patientsTemp = patients;
    });
  }

  searchByPhoneNumber(phoneNumber: string) {
    let patientsFilter: Patient[] = []; // dont use foreach in JS you cannot debug it, also start debuging you code!  
  

    console.log(phoneNumber);


    this.patientsTemp.forEach(patient => {
      if (patient.phoneNumber.replace("-", "").includes(phoneNumber)) {
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


  filter() {
    let str:string =  this.searchKey.replace("-", "");
    if (str && str.length != 0)
      this.patients =
        /[0-9]+$/.test(str) ?
          this.searchByPhoneNumber(str) :
          this.searchByName(str);
    else this.patients = this.patientsTemp;
  }

}
