import { Injectable } from '@angular/core';
import { EbikeData } from './structs/ebikedata';
import { RecordedDataList, HttpRecordedDataList } from './structs/recordedDataList';
import { map, Observable, of, pipe, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class EbikeDataService {

  constructor(private localStore: LocalService,private http: HttpClient) { }

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

  getLiveData(): Observable<EbikeData> {
    return this.http.get<any>(environment.backendUrl + 'data/web/' + this.localStore.getData("choosenMac") + '/livedata').pipe(
      map((receivedData: any) => {
        let temData: EbikeData = {
          id: receivedData.id,
          board_mac: receivedData.board_mac,
          time_stamp: new Date(receivedData.time_stamp),
          battery_temp: receivedData.battery_temp,
          motor_temp: receivedData.motor_temp,
          mosfet_temp: receivedData.mosfet_temp,
          motor_current: receivedData.motor_current,
          battery_current: receivedData.input_current,
          battery_voltage: receivedData.input_voltage,
          throttle_value: receivedData.throttle_value,
          rmp: receivedData.rpm,
          duty_cycle_now: receivedData.duty_cycle_now,
          amp_hours_used: receivedData.amp_hours,
          amp_hours_charged: receivedData.amp_hours_charged,
          watt_hours_used: receivedData.watt_hours,
          watt_hours_charged: receivedData.watt_hours_charged,
          error_code: receivedData.error_code
        };
          
        return temData;
      })
    );
  }

  getRecordedDataTimestamps(): Observable<Array<RecordedDataList>> {
    return this.http.get<Array<HttpRecordedDataList>>(environment.backendUrl + 'time/web/' + this.localStore.getData("choosenMac") + '/timestamps').pipe(
      map((receivedData: Array<HttpRecordedDataList>) => {
        let temData: Array<RecordedDataList> = [];
        receivedData.forEach((element) => {
          temData.push({
            id: element.id,
            board_mac: element.board_mac,
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
    return this.http.get<Array<any>>(environment.backendUrl + 'data/web/' + this.localStore.getData("choosenMac") + '/record/' + id).pipe(
      map((receivedData: Array<any>) => {
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
            battery_current: element.input_current,
            battery_voltage: element.input_voltage,
            throttle_value: element.throttle_value,
            rmp: element.rpm,
            duty_cycle_now: element.duty_cycle_now,
            amp_hours_used: element.amp_hours,
            amp_hours_charged: element.amp_hours_charged,
            watt_hours_used: element.watt_hours,
            watt_hours_charged: element.watt_hours_charged,
            error_code: element.error_code
          });
        });
        return temData;
      }
      ));
  }

  postRecordToogleState(state: boolean) {
    this.http.post(environment.backendUrl + 'data/web/recordstatus/' + state, {}).subscribe();
    return this.http.post(environment.backendUrl + 'time/web/' + this.localStore.getData("choosenMac") + '/recordstatus/' + state, {}).subscribe();
  }

  deleteTimestamp(id: number) {
    return this.http.delete(environment.backendUrl + 'time/web/delete/' + id);
  }
}
