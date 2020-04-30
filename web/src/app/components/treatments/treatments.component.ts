import { Component, OnInit, Input } from '@angular/core';
import { Treatment } from 'src/app/models';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent implements OnInit {
  @Input() treatments : Treatment[];

  constructor() { }

  ngOnInit(): void {
  
    

  }


}
