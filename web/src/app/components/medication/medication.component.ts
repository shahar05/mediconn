import { Component, OnInit, Input } from '@angular/core';
import { Medication } from 'src/app/models';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent implements OnInit {
  @Input() medication : Medication;
  constructor() { }

  ngOnInit(): void {
  }

}
