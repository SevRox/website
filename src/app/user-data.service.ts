import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BoardData } from './structs/boards';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {


  constructor() { }

  getUserBoards(): Observable<Array<BoardData>> {
    let mockData: Array<BoardData> = [];

    mockData.push(
      {
        mac_address: '2d5t7690kju9i',
        name: 'Stefan',
        user_id: 1,
        is_online: false,
        last_choosen: false
      });
    mockData.push(
      {
        mac_address: '2d5t7690kju9i',
        name: 'Marian',
        user_id: 1,
        is_online: false,
        last_choosen: false
      });
    mockData.push(
      {
        mac_address: '2d5t7690kju9i',
        name: 'Tomek',
        user_id: 1,
        is_online: true,
        last_choosen: true
      });

    return of(mockData);
  }
}
