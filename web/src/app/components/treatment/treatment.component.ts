import { Component, OnInit, Input } from '@angular/core';
import { Treatment } from 'src/app/models';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss']
})
export class TreatmentComponent implements OnInit {
  @Input() treatment : Treatment;

  constructor() { }

  ngOnInit(): void {
  }



}
