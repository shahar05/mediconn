import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';
import { Patient } from 'src/app/models';

@Component({
  selector: 'app-view-patients',
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.scss']
})
export class ViewPatientsComponent implements OnInit {
  phoneNumber: string;
  patients: Patient[];
  patientsFilter : Patient[] = [];
  constructor(private patientService: PatientService, private userService: UserService) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe((patients: Patient[]) => {
      this.patients = patients;
    })
  }

  filter(){
    console.log("asd");
    
    this.patients.forEach(patient => {
      if (patient.phoneNumber.includes(this.phoneNumber) ) {
          this.patientsFilter.push(patient);
      } 
  });
  this.patients = this.patientsFilter;
  
    
  }

}
