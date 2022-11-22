import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { BoardData } from '../structs/boards';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-delete-board',
  templateUrl: './delete-board.component.html',
  styleUrls: ['./delete-board.component.scss']
})
export class DeleteBoardComponent implements OnInit {

  userBoards: Array<BoardData> = [];

  constructor(private userDataService: UserDataService, protected windowRef: NbWindowRef) { }

  ngOnInit(): void {
    this.getUserBoards();
  }

  getUserBoards() {
    this.userDataService.getUserBoards().subscribe(userBoards => { this.userBoards = userBoards });
  }

  deleteBoard(board: BoardData) {
    console.log(board.mac_address);
    this.windowRef.close(board);
  }

}
