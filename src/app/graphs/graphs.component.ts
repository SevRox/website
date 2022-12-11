import { Component, OnInit } from '@angular/core';
import { RecordedDataList } from '../structs/recordedDataList';
import { EbikeDataService } from '../ebikedata.service';
import { EbikeData } from '../structs/ebikedata';
import { EChartsOption } from 'echarts';
import { NbTreeGridHeaderCellDirective, NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { RegisterBoardComponent } from '../register-board/register-board.component';
import { DeleteTimestampComponent } from '../delete-timestamp/delete-timestamp.component';

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

  constructor(private ebikedataService: EbikeDataService, private windowService: NbWindowService) { }

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

  openDeleteWindow() {
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: false,
      maximize: false,
      fullScreen: false,
      close: true,
    };

    const windowRef = this.windowService.open(DeleteTimestampComponent, { title: `Warning`, buttons: buttonsConfig });

    windowRef.onClose.subscribe((id) => {
      if (id !== undefined) {
        console.log(id);
        this.ebikedataService.deleteTimestamp(id).subscribe(() => {
          this.getRecordedDataListTimestamps();
        });
      }
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
        orient: 'horizontal',
        // itemWidth: 25, // Set the width of each legend item to 30 pixels
        //  itemGap: 0,
        // align: 'left',
        // width: '100%', // Set the width of the legend area to 50% of the chart width
        // height: '50%', // Set the height of the legend area to 50% of the chart height
        bottom: -20,
        textStyle: {
          color: '#fff', // Set the text color to white
          // fontSize: 8 // Set the font size of the legend items to 12 pixels
        }
      },
      dataZoom: {
        type: 'inside'
      },
      xAxis: {
        type: 'value',
        min: 0,
        boundaryGap: false,
        name: 'Time, s',
        nameLocation: 'middle',
        nameGap: 25,
      },
      yAxis: {
        min: 0,
        type: 'value',
        name: '         Temperature, °C',
        nameLocation: 'end',
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
        bottom: -20,
        textStyle: {
            color: '#fff' // Set the text color to white
        }
      },
      dataZoom: {
        type: 'inside'
      },
      xAxis: {
        type: 'value',
        min: 0,
        boundaryGap: false,
        name: 'Time, s',
        nameLocation: 'middle',
        nameGap: 25,
      },
      yAxis: [
        {
          min: 0,
          type: 'value',
          name: '   Current, A',
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
      legend: {
        textStyle: {
            color: '#fff' // Set the text color to white
        }
      },
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
