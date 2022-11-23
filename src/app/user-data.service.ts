import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BoardData } from './structs/boards';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  getUserBoards(): Observable<Array<BoardData>> {
    return this.http.get<Array<BoardData>>(environment.backendUrl + "/web/all");
  }

  deleteBoard(board_mac: string) {
    this.http.delete(environment.backendUrl + "/web/delete/" + board_mac).subscribe();
  }
}
