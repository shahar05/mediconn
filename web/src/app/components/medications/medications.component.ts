import { Component, OnInit, Input } from '@angular/core';
import { MedicalAdditions } from 'src/app/models';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent implements OnInit {
  @Input() medications: MedicalAdditions[];

  constructor() { }

  ngOnInit(): void {


  }

}
