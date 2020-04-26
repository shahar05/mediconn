import { Injectable } from '@angular/core';
import { NetService } from './net.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private net : NetService) { }

  getPatients(doctorID : String){
      return this.net.getPatients(doctorID);
  }

}
