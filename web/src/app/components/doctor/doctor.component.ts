import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Doctor } from 'src/app/models';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  @Input() doctor : Doctor;
  @Output() editClicked : EventEmitter<Doctor> = new EventEmitter<Doctor>();
  @Output() deleteClicked : EventEmitter<Doctor> = new EventEmitter<Doctor>();
  constructor() { }

  ngOnInit(): void {
  }
  editDoctor(){
    this.editClicked.emit(this.doctor);
  }
  deleteDoctor(){
    this.deleteClicked.emit(this.doctor);
  }
}
