import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent implements OnInit {
  @Input() treatments: any[];

  constructor() { }

  ngOnInit(): void {



  }


}
