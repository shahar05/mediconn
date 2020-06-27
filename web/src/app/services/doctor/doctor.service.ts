import { Injectable } from '@angular/core';
import { NetService } from '../net/net.service';
import { Doctor } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private net : NetService) { }

  getDoctors( adminID : string ){
    return this.net.getDoctors(adminID);
  }

  createDoctor( doctor : Doctor ){
    return this.net.createDoctor(doctor);
  }

  deleteDoctor(doctorID : string) {
    return this.net.deleteDoctor(doctorID);
  }
  updateDoctor(doctor : Doctor) {
    return this.net.updateDoctor(doctor);
  }

}
