import { Injectable } from '@angular/core';
import { EbikeData } from './structs/ebikedata';
import { RecordedDataList } from './structs/recordedDataList';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EbikeDataService {

  constructor() { }

  max = 100;

  // mock 
  getMockEbike(): EbikeData{
      let mockdata: EbikeData = {
      id: Math.floor(Math.random() * this.max) + 1,
      boardId: Math.floor(Math.random() * this.max) + 1,
      timestamp: new Date(),
      battery_temp: Math.floor(Math.random() * this.max) + 1,
      motor_temp: Math.floor(Math.random() * this.max) + 1,
      mosfet_temp: Math.floor(Math.random() * this.max) + 1,
      motor_current: Math.floor(Math.random() * this.max) + 1,
      battery_current: Math.floor(Math.random() * this.max) + 1,
      battery_voltage: Math.floor(Math.random() * this.max) + 1,
      throttle_val: Math.floor(Math.random() * this.max) + 1,
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

  getLiveData(): Observable<EbikeData>{
    // data for testing
    let mockdata: EbikeData = {
      id: Math.floor(Math.random() * this.max) + 1,
      boardId: Math.floor(Math.random() * this.max) + 1,
      timestamp: new Date(),
      battery_temp: Math.floor(Math.random() * this.max) + 1,
      motor_temp: Math.floor(Math.random() * this.max) + 1,
      mosfet_temp: Math.floor(Math.random() * this.max) + 1,
      motor_current: Math.floor(Math.random() * this.max) + 1,
      battery_current: Math.floor(Math.random() * this.max) + 1,
      battery_voltage: Math.floor(Math.random() * this.max) + 1,
      throttle_val: Math.floor(Math.random() * this.max) + 1,
      rmp: Math.floor(Math.random() * this.max) + 1,
      duty_cycle_now: Math.floor(Math.random() * this.max) + 1,
      amp_hours_used: Math.floor(Math.random() * this.max) + 1,
      amp_hours_charged: Math.floor(Math.random() * this.max) + 1,
      watt_hours_used: Math.floor(Math.random() * this.max) + 1,
      watt_hours_charged: Math.floor(Math.random() * this.max) + 1,
      error_code: Math.floor(Math.random() * this.max) + 1,
    };
    return of(mockdata);
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

  getRecordedDataById(id: number): Observable<Array<EbikeData>>{
    let mockdata: Array<EbikeData> = [];
    for (let index = 0; index < 30; index++) {
      mockdata.push(this.getMockEbike());
    }

    return of(mockdata);
  }
}
