import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { UserService } from 'src/app/services/user/user.service';
import { Doctor, width, height } from 'src/app/models';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DoctorEditorComponent } from '../doctor-editor/doctor-editor.component';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';


@Component({
  selector: 'app-doctors-view',
  templateUrl: './doctors-view.component.html',
  styleUrls: ['./doctors-view.component.scss']
})
export class DoctorsViewComponent implements OnInit {
  adminID: string;
  doctors: Doctor[];
  constructor(private diaolog: DialogService, private doctorService: DoctorService, private userService: UserService) { }

  ngOnInit(): void {
    this.adminID = this.userService.getAdminID();
    this.doctorService.getDoctors(this.adminID).subscribe((doctors: Doctor[]) => {
      this.doctors = doctors;
    })
  }

  editDoctor(d: Doctor) {
    let doctor: Doctor = JSON.parse(JSON.stringify(d));
    this.diaolog.openDialog(DoctorEditorComponent, { doctor: doctor, edit: true }, width)
      .afterClosed().subscribe((doctor: Doctor) => {
        if(doctor)
        this.doctorService.updateDoctor(doctor).subscribe((updateDoctor : Doctor) => {
          let index = this.doctors.findIndex((doc)=> doc._id ===  updateDoctor._id );
          this.doctors[index] = updateDoctor; 
        },(err)=>{ alert("Username already in use"); console.log(err);;
         })
      })
  }

  deleteDoctor(doctor: Doctor) {
    this.diaolog.openDialog(DialogAlertComponent, { isDefault: true }, width, height)
      .afterClosed().subscribe((res) => {
        if (res)
          this.doctorService.deleteDoctor(doctor._id).subscribe(() => {
              let index = this.doctors.findIndex((doc)=> doc._id ===  doctor._id );
              this.doctors.splice(index , 1);
          })
      })
  }

}
