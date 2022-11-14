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

  postRecordToogleState(state: boolean) {
    return this.http.post(this.url + '/web/recordstatus/' + state + '/update', {}).subscribe();
  }
}
