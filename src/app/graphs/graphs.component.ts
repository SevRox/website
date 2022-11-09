import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecordedDataList } from '../structs/recordedDataList';
import { EbikeDataService } from '../ebikedata.service';
import { EbikeData } from '../structs/ebikedata';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  constructor(private ebikedataService: EbikeDataService) { }

  recordedDataListTimestamps: Array<RecordedDataList> = [];
  ebikeDataList: Array<Array<EbikeData>> = [];

  ngOnInit(): void {
    this.getRecordedDataListTimestamps();
  }

  getRecordedDataListTimestamps() {
    this.ebikedataService.getRecordedDataTimestamps().subscribe(rd => this.recordedDataListTimestamps = rd);
  }

  getChoosenEbikeData() {

    // cleaning the array of data
    this.ebikeDataList.splice(0);

    // getiing all chosen data
    this.recordedDataListTimestamps.filter(
      (checked) => { return checked.checkBoxState == true })
      .forEach(checked => { this.ebikedataService.getRecordedDataById(checked.id).subscribe(ebd => this.ebikeDataList.push(ebd)) });
    
    console.log(this.ebikeDataList);
  }
}
