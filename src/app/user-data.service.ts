import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalService } from './local.service';
import { BoardData } from './structs/boards';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private localSore: LocalService,private http: HttpClient, private authService: NbAuthService) { }

  getUserBoards(): Observable<Array<BoardData>> {
    let my_requestOptions;

    this.authService.getToken().subscribe(token => {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      });
    
      my_requestOptions = { headers: headers };
    });

    return this.http.get<Array<BoardData>>(environment.backendUrl + 'boards/web/all/9', my_requestOptions).pipe(
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
    let my_requestOptions;

    this.authService.getToken().subscribe(token => {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      });
    
      my_requestOptions = { headers: headers };
    });

    return this.http.delete(environment.backendUrl + 'boards/web/delete/' + board_mac, my_requestOptions);
  }

  registerBoard(boardData: BoardData) {
    let my_requestOptions;

    this.authService.getToken().subscribe(token => {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      });
    
      my_requestOptions = { headers: headers };
    });

    const body = {
      user_id: boardData.user_id,
      name: boardData.name,
      mac_address: boardData.mac_address,
      is_online: boardData.is_online
    };
    this.http.post<any>(environment.backendUrl + 'boards/web/register', body, my_requestOptions).subscribe();
  }

  getLastchoosenBoardByMac(): Observable<string> {
    let my_requestOptions;

    this.authService.getToken().subscribe(token => {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      });
    
      my_requestOptions = { headers: headers };
    });

    return this.http.get<any>(environment.backendUrl + 'data/web/lastboard', my_requestOptions).pipe(
      map((mac_json: any) => { 
        let address: string;
        address = mac_json.macBoard;
        return address;
      })
    );
  }
}
