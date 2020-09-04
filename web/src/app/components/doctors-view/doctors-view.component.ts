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
  doctorsTemp: Doctor[];
  searchKey : string;

  constructor(private diaolog: DialogService, private doctorService: DoctorService, private userService: UserService) { }

  ngOnInit(): void {
    this.adminID = this.userService.getAdminID();
    this.doctorService.getDoctors(this.adminID).subscribe((doctors: Doctor[]) => {
      this.doctors = doctors;
      this.doctorsTemp = doctors;
    })
  }

  clear(){
    this.doctors = this.doctorsTemp 
  }

  search(){
    let strNoTrim: string[] = this.searchKey.split(" ");
    let str: string = this.searchKey.trim().replace(/-/gi, "");
    let d: Doctor[] = [];

    if (str && str.length != 0) {
      if (/[0-9]+$/.test(str)) {
        d = this.searchByPhoneNumber(str)
      }
      else {

        d = this.searchFullName(this.searchKey);

        if (!d) {
          d = this.searchByName(str);
          let i = 0;
          while (!d.length || i < strNoTrim.length) {
            if (strNoTrim[i].length)
              d = this.searchByName(strNoTrim[i++]);
            else
              i++;
          }
        }
      }

    }
    this.doctors =d;
  }


  searchByName(patientName: string){
    let patientsFilter: Doctor[] = [];
    if (!/^[a-zA-Z]+$/.test(patientName)) return this.doctorsTemp;

    patientName = patientName.toLowerCase();
    this.doctorsTemp.forEach(patient => {

      if (patient.firstName.toLocaleLowerCase().includes(patientName)
        || patient.lastName.toLocaleLowerCase().includes(patientName)) {
        patientsFilter.push(patient);
      }
    });
    return patientsFilter;
  }

  searchFullName(fullname: string){
    let patientsFilter: Doctor[] = [];
    fullname = fullname.toLowerCase();
    this.doctorsTemp.forEach(patient => {

      let patientName =
        patient.firstName.toLocaleLowerCase() +
        patient.lastName.toLocaleLowerCase();

      if (patientName.includes(fullname)) {
        patientsFilter.push(patient);
      }
    });
    return patientsFilter;
  }

  searchByPhoneNumber(searchingNumber: string){
    let doctorsFilter: Doctor[] = [];

    this.doctorsTemp.forEach(p => {
      if (p.phoneNumber.replace(/-/gi, "").includes(searchingNumber)) {
        p.phoneNumber = p.phoneNumber.replace(/-/gi, "");
        p.phoneNumber = p.phoneNumber.substring(0, 3) +
          "-" + p.phoneNumber.substring(3, p.phoneNumber.length);
          doctorsFilter.push(p);
      }
    });
    return doctorsFilter;
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
