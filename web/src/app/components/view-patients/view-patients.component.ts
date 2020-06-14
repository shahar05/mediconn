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

      patients.map(p => { p.phoneNumber = p.phoneNumber.substring(0, 3) + "-" + p.phoneNumber.substring(3, p.phoneNumber.length) });

      this.patients = patients;
      this.patientsTemp = patients;


    });
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
