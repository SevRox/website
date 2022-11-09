import { Injectable } from '@angular/core';
import { EbikeData } from './structs/ebikedata';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EbikeDataService {

  constructor() { }

  max = 100;

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
}
