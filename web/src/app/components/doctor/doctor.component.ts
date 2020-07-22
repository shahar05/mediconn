import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Doctor } from 'src/app/models';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local/local-storage.service';
import { LocalStorageKey } from 'src/app/enum';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  @Input() doctor : Doctor;
  @Output() editClicked : EventEmitter<Doctor> = new EventEmitter<Doctor>();
  @Output() deleteClicked : EventEmitter<Doctor> = new EventEmitter<Doctor>();
  constructor( private router : Router , private localStorageService : LocalStorageService ) { }

  ngOnInit(): void {
  }
  editDoctor(){
    this.editClicked.emit(this.doctor);
  }
  deleteDoctor(){
    this.deleteClicked.emit(this.doctor);
  }
  viewDoctor(){
    this.localStorageService.setItem( LocalStorageKey.Doctor , this.doctor._id  )
      this.router.navigate( ["patients"] )
  }


}
