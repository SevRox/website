import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalService } from './local.service';
import { BoardData } from './structs/boards';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private localSore: LocalService,private http: HttpClient) { }

  getUserBoards(): Observable<Array<BoardData>> {
    return this.http.get<Array<BoardData>>(environment.backendUrl + 'boards/web/all/9').pipe(
      map((receivedData: Array<BoardData>) => {
        let lastMac: String = this.localSore.getData("choosenMac");
        receivedData.forEach(element => {
          if (element.mac_address == lastMac)
            element.last_choosen = true;
        })
        return receivedData;
      })
    );
  }

  deleteBoard(board_mac: string) {
    this.http.delete(environment.backendUrl + 'boards/web/delete/' + board_mac).subscribe();
  }

  registerBoard(boardData: BoardData) {
    const body = {
      user_id: boardData.user_id,
      name: boardData.name,
      mac_address: boardData.mac_address,
      is_online: boardData.is_online
    };
    this.http.post<any>(environment.backendUrl + 'boards/web/register', body).subscribe();
  }

  getLastchoosenBoardByMac(): Observable<string> {
    return this.http.get<any>(environment.backendUrl + 'data/web/lastboard').pipe(
      map((mac_json: any) => { 
        let address: string;
        address = mac_json.board_mac;
        return address;
      })
    );
  }
}
