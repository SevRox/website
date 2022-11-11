import { Component, OnInit } from '@angular/core';
import { RecordedDataList } from '../structs/recordedDataList';
import { EbikeDataService } from '../ebikedata.service';
import { EbikeData } from '../structs/ebikedata';
import { EChartsOption } from 'echarts';
import { NbTreeGridHeaderCellDirective } from '@nebular/theme';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  constructor(private ebikedataService: EbikeDataService) { }

  chartOption: EChartsOption = {};

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

    this.createTemChart();
  }

  createTemChart() {
    let firstTime = this.ebikeDataList[0][0].timestamp.getTime();

    this.chartOption = {
      toolbox: {
        feature: {
          dataZoom: {},
          restore: {},
          dataView: {},
          saveAsImage: {}
        }
      },
      legend: {
        show: true,
        bottom: 1,
      },
      dataZoom: {
        type: 'inside'
      },
      xAxis: {
        type: 'value',
        min: 0,
        boundaryGap: false,
      },
      yAxis: {
        min: 0,
        type: 'value'
      },
      series: [
      {
        name: "Momot temperature",
        data: this.ebikeDataList[0].map((edata) => [(edata.timestamp.getTime() - firstTime) / 60, edata.motor_temp ]),
        type: 'line',
        smooth: true,
        // areaStyle: {}
      },
      {
        name: "Mosfet temperature",
        data: this.ebikeDataList[0].map((edata) => [(edata.timestamp.getTime() - firstTime) / 60, edata.mosfet_temp ]),
        type: 'line',
        smooth: true,
        // areaStyle: {}
      },
      {
        name: "Battery temperature",
        data: this.ebikeDataList[0].map((edata) => [(edata.timestamp.getTime() - firstTime) / 60, edata.battery_temp ]),
        type: 'line',
        smooth: true,
        // areaStyle: {}
      }
      ]
    }
  }

}
