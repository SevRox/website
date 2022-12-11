import { Injectable } from '@angular/core';
import { EbikeData } from './structs/ebikedata';
import { RecordedDataList, HttpRecordedDataList } from './structs/recordedDataList';
import { map, Observable, of, pipe, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalService } from './local.service';
import { NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class EbikeDataService {

  constructor(private localStore: LocalService, private http: HttpClient, private authService: NbAuthService) { }

  getLiveData(): Observable<EbikeData> {
    let my_requestOptions;

    this.authService.getToken().subscribe(token => {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      });
    
      my_requestOptions = { headers: headers };
    });

    return this.http.get<any>(environment.backendUrl + 'data/web/' + this.localStore.getData("choosenMac") + '/livedata', my_requestOptions).pipe(
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
    let my_requestOptions;

    this.authService.getToken().subscribe(token => {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      });
    
      my_requestOptions = { headers: headers };
    });

    return this.http.get<Array<HttpRecordedDataList>>(environment.backendUrl + 'time/web/' + this.localStore.getData("choosenMac") + '/timestamps', my_requestOptions).pipe(
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
    let my_requestOptions;

    this.authService.getToken().subscribe(token => {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      });
    
      my_requestOptions = { headers: headers };
    });

    return this.http.get<Array<any>>(environment.backendUrl + 'data/web/' + this.localStore.getData("choosenMac") + '/record/' + id, my_requestOptions).pipe(
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
    let my_requestOptions;

    this.authService.getToken().subscribe(token => {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      });
    
      my_requestOptions = { headers: headers };
    });

    this.http.post(environment.backendUrl + 'data/web/recordstatus/' + state, {}, my_requestOptions).subscribe();
    return this.http.post(environment.backendUrl + 'time/web/' + this.localStore.getData("choosenMac") + '/recordstatus/' + state, {}, my_requestOptions).subscribe();
  }

  deleteTimestamp(id: number) {
    let my_requestOptions;

    this.authService.getToken().subscribe(token => {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      });
    
      my_requestOptions = { headers: headers };
    });

    return this.http.delete(environment.backendUrl + 'time/web/delete/' + id, my_requestOptions);
  }
}
