import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BoardData } from './structs/boards';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  url = 'https://fad18710-c488-4194-9f3e-8c935b8d4c04.mock.pstmn.io';

  constructor(private http: HttpClient) { }

  getUserBoards(): Observable<Array<BoardData>> {
    return this.http.get<Array<BoardData>>(this.url + "/web/all");
  }

  deleteBoard(board_mac: string) {
    this.http.delete(this.url + "/web/delete/" + board_mac).subscribe();
  }
}
