import { Component, OnInit } from '@angular/core';
import { RecordedDataList } from '../structs/recordedDataList';
import { EbikeDataService } from '../ebikedata.service';
import { EbikeData } from '../structs/ebikedata';
import { EChartsOption } from 'echarts';
import { NbTreeGridHeaderCellDirective } from '@nebular/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  temChart: EChartsOption = {};
  VolCurrChart: EChartsOption = {};
  AmpWattUsedChart: EChartsOption = {};

  recordedDataListTimestamps: Array<RecordedDataList> = [];
  ebikeDataList: Array<Array<EbikeData>> = [];

  constructor(private ebikedataService: EbikeDataService) { }

  ngOnInit(): void {
    this.getRecordedDataListTimestamps();
  }

  getRecordedDataListTimestamps() {
    this.ebikedataService.getRecordedDataTimestamps().subscribe(rd => {
      this.recordedDataListTimestamps = rd;
    });
  }

  getChoosenEbikeData() {

    this.ebikeDataList.splice(0);

    // getiing all chosen data
    this.recordedDataListTimestamps.filter(
      (checked) => { return checked.checkBoxState == true })
      .forEach(checked => {
        this.ebikedataService.getRecordedDataById(checked.id).subscribe(ebd => {
          this.ebikeDataList.push(ebd)
          console.log(this.ebikeDataList);
          this.createTemChart();
          this.createVolCurrChart();
          this.createAmpWattUsedChart();
        })
      });
  }

  createTemChart() {
    let firstTime = this.ebikeDataList[0][0].time_stamp.getTime();

    this.temChart = {
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
        name: 'Time, s'
      },
      yAxis: {
        min: 0,
        type: 'value',
        name: 'Temperature, °C',
      },
      series: [
        {
          name: "Motor temp",
          data: this.ebikeDataList[0].map((edata) => [(edata.time_stamp.getTime() - firstTime) / 60, edata.motor_temp]),
          type: 'line',
          smooth: true,
        },
        {
          name: "Mosfet temp",
          data: this.ebikeDataList[0].map((edata) => [(edata.time_stamp.getTime() - firstTime) / 60, edata.mosfet_temp]),
          type: 'line',
          smooth: true,
        },
        {
          name: "Battery temp",
          data: this.ebikeDataList[0].map((edata) => [(edata.time_stamp.getTime() - firstTime) / 60, edata.battery_temp]),
          type: 'line',
          smooth: true,
        }
      ]
    }
  }

  createVolCurrChart() {
    let firstTime = this.ebikeDataList[0][0].time_stamp.getTime();

    this.VolCurrChart = {
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
        name: 'Time, s'
      },
      yAxis: [
        {
          min: 0,
          type: 'value',
          name: 'Current, A',
          position: 'left',
          alignTicks: true,
        },
        {
          min: 0,
          type: 'value',
          name: 'Voltage, V',
          position: 'right',
          alignTicks: true,
        }
      ],
      series: [
        {
          name: "Motor Current",
          data: this.ebikeDataList[0].map((edata) => [(edata.time_stamp.getTime() - firstTime) / 60, edata.motor_current]),
          type: 'line',
          smooth: true,
        },
        {
          name: "Battery Current",
          data: this.ebikeDataList[0].map((edata) => [(edata.time_stamp.getTime() - firstTime) / 60, edata.battery_current]),
          type: 'line',
          smooth: true,
        },
        {
          name: "Battery Voltage",
          yAxisIndex: 1,
          data: this.ebikeDataList[0].map((edata) => [(edata.time_stamp.getTime() - firstTime) / 60, edata.battery_voltage]),
          type: 'line',
          smooth: true,
        }
      ]
    }
  }

  createAmpWattUsedChart() {
    this.AmpWattUsedChart = {
      toolbox: {
        feature: {
          dataView: {},
          saveAsImage: {},
          restore: {}
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis:
      {
        type: 'category',
        data: ['AH\n Used', 'WH\n Used']
      },
      series: [
        {
          name: "1",
          data: [this.ebikeDataList[0][this.ebikeDataList.length - 1].amp_hours_used, this.ebikeDataList[0][this.ebikeDataList.length - 1].watt_hours_used],
          type: 'bar'
        }
      ]
    }
  }

}
