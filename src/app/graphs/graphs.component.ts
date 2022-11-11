import { Component, OnInit } from '@angular/core';
import { RecordedDataList } from '../structs/recordedDataList';
import { EbikeDataService } from '../ebikedata.service';
import { EbikeData } from '../structs/ebikedata';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  constructor(private ebikedataService: EbikeDataService) { }

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650.1450, 1680.1890],
      type: 'line',
      areaStyle: {}
    }]
  }

  recordedDataListTimestamps: Array<RecordedDataList> = [];
  ebikeDataList: Array<Array<EbikeData>> = [];

  ngOnInit(): void {
    this.getRecordedDataListTimestamps();
    // this.createChart();
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
