import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-patients',
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.scss']
})
export class ViewPatientsComponent implements OnInit {

  constructor(private patientService : PatientService ,private userService : UserService) { }

  ngOnInit(): void {
    this.patientService.getPatients(this.userService.getDoctorID()).subscribe(()=>{
      
    })
  }

}
