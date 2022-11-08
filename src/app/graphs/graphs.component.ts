import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { recordedDataList } from '../structs/recordedDataList';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  constructor() {}
  
  mock_list: recordedDataList[] = [];

  ngOnInit(): void {
    this.mock_list = [
      { id: 1, day: new Date(), duration: 15, checkBoxState: false },
      { id: 2, day: new Date(), duration: 45, checkBoxState: false },
      { id: 3, day: new Date(), duration: 80, checkBoxState: false },
      { id: 4, day: new Date(), duration: 12, checkBoxState: false },
      { id: 5, day: new Date(), duration: 12, checkBoxState: false },
      { id: 6, day: new Date(), duration: 12, checkBoxState: false },
      { id: 7, day: new Date(), duration: 42, checkBoxState: false },
      { id: 8, day: new Date(), duration: 12, checkBoxState: false },
      { id: 9, day: new Date(), duration: 12, checkBoxState: false },
    ];

  }

}
