import { Component, OnInit, Inject } from '@angular/core';
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
  patientsToGraph: Patient[] = [];
  fromPop: boolean = false;

  constructor(private patientService: PatientService,
    private userService: UserService,
  ) { }
  ngOnInit(): void {
    const doctorId: string = this.userService.getCurrentDoctorDetails();
    this.patientService.getPatients(doctorId).subscribe((patients: Patient[]) => {
      patients.map(p => { p.phoneNumber = p.phoneNumber.substring(0, 3) + "-" + p.phoneNumber.substring(3, p.phoneNumber.length) });
      this.patients = patients;
      console.log(patients);
      
      this.patientsTemp = patients;
      this.patientService.clearSharedMessage();
      this.patientService.sharedMessage.subscribe((p: Patient) => {
        if (p) {
          this.patients.push(p);
          this.patientsTemp = patients;
        }
      })
    });
    

  }

  clear_all(){
    this.patients= this.patientsTemp  ;
  }

  addPatientToGraph(patient: Patient) {

    let index: number = this.patientsToGraph.findIndex((p: Patient) => { patient._id === p._id })

    if (index === -1) {
      this.patientsToGraph.push(patient)
    } else {
      this.patientsToGraph.splice(index, 1);
    }

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
            if (strNoTrim[i].length)
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
