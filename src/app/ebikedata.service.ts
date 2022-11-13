import { Injectable } from '@angular/core';
import { EbikeData } from './structs/ebikedata';
import { RecordedDataList } from './structs/recordedDataList';
import { map, Observable, of, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TransformDate } from './dateConverter';

@Injectable({
  providedIn: 'root'
})
export class EbikeDataService {

  url = 'https://fad18710-c488-4194-9f3e-8c935b8d4c04.mock.pstmn.io';

  constructor(private http: HttpClient) { }

  max = 100;

  // mock 
  getMockEbike(): EbikeData {
    let mockdata: EbikeData = {
      id: Math.floor(Math.random() * this.max) + 1,
      board_mac: String(Math.floor(Math.random() * this.max) + 1),
      time_stamp: new Date(),
      battery_temp: Math.floor(Math.random() * this.max) + 1,
      motor_temp: Math.floor(Math.random() * this.max) + 1,
      mosfet_temp: Math.floor(Math.random() * this.max) + 1,
      motor_current: Math.floor(Math.random() * this.max) + 1,
      battery_current: Math.floor(Math.random() * this.max) + 1,
      battery_voltage: Math.floor(Math.random() * this.max) + 1,
      throttle_value: Math.floor(Math.random() * this.max) + 1,
      rmp: Math.floor(Math.random() * this.max) + 1,
      duty_cycle_now: Math.floor(Math.random() * this.max) + 1,
      amp_hours_used: Math.floor(Math.random() * this.max) + 1,
      amp_hours_charged: Math.floor(Math.random() * this.max) + 1,
      watt_hours_used: Math.floor(Math.random() * this.max) + 1,
      watt_hours_charged: Math.floor(Math.random() * this.max) + 1,
      error_code: Math.floor(Math.random() * this.max) + 1,
    };
    return mockdata;
  }

  @TransformDate
  getLiveData(): Observable<EbikeData> {
    return this.http.get<EbikeData>(this.url + '/web/livedata');
  }

  getRecordedDataTimestamps(): Observable<Array<RecordedDataList>> {

    let mockdata: Array<RecordedDataList> = [
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

    return of(mockdata);
  }

  getRecordedDataById(id: number): Observable<Array<EbikeData>> {
    let mockdata: Array<EbikeData> = [];
    mockdata.push(this.getMockEbike());
    for (let index = 0; index < 100; index++) {
      let sectemdata = this.getMockEbike();
      sectemdata.time_stamp.setTime(mockdata[index].time_stamp.getTime() + 1000);
      sectemdata.motor_temp = mockdata[index].motor_temp + Math.random() * 5 - 2.5;
      sectemdata.mosfet_temp = mockdata[index].mosfet_temp + Math.random() * 5 - 2.5;
      sectemdata.battery_temp = mockdata[index].battery_temp + Math.random() * 5 - 2.5;
      mockdata.push(sectemdata);
    }

    return of(mockdata);
  }
}
