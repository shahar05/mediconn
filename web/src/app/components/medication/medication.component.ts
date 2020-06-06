import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent implements OnInit {
  @Input() medication: any;
  constructor() { }

  ngOnInit(): void {
  }

}
