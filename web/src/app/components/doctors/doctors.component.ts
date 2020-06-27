import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Doctor } from 'src/app/models';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  @Input() doctors : Doctor[];
  @Output() editClicked : EventEmitter<Doctor> = new EventEmitter<Doctor>();
  @Output() deleteClicked : EventEmitter<Doctor> = new EventEmitter<Doctor>();
  constructor() { }

  ngOnInit(): void {
  }

  editDoctor(doctor : Doctor){
    this.editClicked.emit(doctor);
  }
  deleteDoctor(doctor : Doctor){
  this.deleteClicked.emit(doctor);
  }
}
