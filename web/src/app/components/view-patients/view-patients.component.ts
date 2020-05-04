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
  patients: Patient[];
  patientsFilter: Patient[] = [];
  constructor(private patientService: PatientService, private userService: UserService) { }

  ngOnInit(): void {
    const doctorId: string = this.userService.getCurrentDoctorDetails();
    this.patientService.getPatients(doctorId).subscribe((patients: Patient[]) => {
      this.patients = patients;
    });
  }

  filter() {
    this.patients.forEach(patient => {    // dont use foreach in JS you cannot debug it, also start debuging you code!  
      if (patient.phoneNumber.includes(this.phoneNumber)) {
        this.patientsFilter.push(patient);
      }
    });
    this.patients = this.patientsFilter;


  }

}
