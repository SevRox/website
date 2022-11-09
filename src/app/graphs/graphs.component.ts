import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecordedDataList } from '../structs/recordedDataList';
import { EbikeDataService } from '../ebikedata.service';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  constructor(private ebikedataService: EbikeDataService) {}
  
  recordedDataListTimestamps: Array<RecordedDataList> = [];

  getRecordedDataListTimestamps() {
    this.ebikedataService.getRecordedDataTimestamps().subscribe(rd => this.recordedDataListTimestamps = rd);
  }

  ngOnInit(): void {
    this.getRecordedDataListTimestamps();
  }

}
