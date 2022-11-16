import { Injectable } from '@angular/core';
import { EbikeData } from './structs/ebikedata';
import { RecordedDataList, HttpRecordedDataList } from './structs/recordedDataList';
import { map, Observable, of, pipe, tap } from 'rxjs';
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
    return this.http.get<Array<HttpRecordedDataList>>(this.url + '/web/data/timestamps').pipe(
      map((receivedData: Array<HttpRecordedDataList>) => {
        let temData: Array<RecordedDataList> = [];
        receivedData.forEach((element) => {
          temData.push({
            id: element.id,
            board_mac: element.board_mac,
            name: element.name,
            started: new Date(element.started),
            ended: new Date(element.ended),
            duration: Math.floor((new Date(element.ended).getTime() - new Date(element.started).getTime()) / 60000),
            checkBoxState: false
          });
        });
        return temData;
      })
    );
  }

  getRecordedDataById(id: number): Observable<Array<EbikeData>> {
    return this.http.get<Array<EbikeData>>(this.url + '/web/data/recorded/' + id).pipe(
      map((receivedData: Array<EbikeData>) => {
        let temData: Array<EbikeData> = [];
        receivedData.forEach((element) => {
          temData.push({
            id: element.id,
            board_mac: element.board_mac,
            time_stamp: new Date(element.time_stamp),
            battery_temp: element.battery_temp,
            motor_temp: element.motor_temp,
            mosfet_temp: element.mosfet_temp,
            motor_current: element.motor_current,
            battery_current: element.battery_current,
            battery_voltage: element.battery_voltage,
            throttle_value: element.throttle_value,
            rmp: element.rmp,
            duty_cycle_now: element.duty_cycle_now,
            amp_hours_used: element.amp_hours_used,
            amp_hours_charged: element.amp_hours_charged,
            watt_hours_used: element.watt_hours_used,
            watt_hours_charged: element.watt_hours_charged,
            error_code: element.error_code
          });
        });
        return temData;
      }
      ));
  }

  postRecordToogleState(state: boolean) {
    return this.http.post(this.url + '/web/recordstatus/' + state + '/update', {}).subscribe();
  }
}
