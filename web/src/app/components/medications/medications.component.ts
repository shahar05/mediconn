import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MedicalAdditions } from 'src/app/models';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent implements OnInit {
  @Input() medications: MedicalAdditions[];
  @Output() editClicked : EventEmitter<MedicalAdditions> =  new EventEmitter<MedicalAdditions>();
  @Output() deleteClicked : EventEmitter<MedicalAdditions> =  new EventEmitter<MedicalAdditions>();

  constructor() { }

  ngOnInit(): void {

  }

  editMedication(medication : MedicalAdditions) {
    this.editClicked.emit(medication);
  }
  deleteMedication(medication : MedicalAdditions) {
    this.deleteClicked.emit(medication);
  }


}
