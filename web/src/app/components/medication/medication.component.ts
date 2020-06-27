import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent implements OnInit {
  @Input() medication: any;
  @Output() editClicked : EventEmitter<any> =  new EventEmitter<any>();
  @Output() deleteClicked : EventEmitter<any> =  new EventEmitter<any>();
    constructor() { }

  ngOnInit(): void {
  }

  editMedication() {
    this.editClicked.emit(this.medication);
  }
  deleteMedication() {
    this.deleteClicked.emit(this.medication);
  }
}
