import { Component, OnInit } from '@angular/core';
import { BoardData } from '../structs/boards';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userName: string = "Bartosz Kowalski";
  userBoards: Array<BoardData> = [];

  constructor(private userDataService: UserDataService) {

  }

  ngOnInit(): void {
    this.getUserBoards();
  }

  getUserBoards() {
    this.userDataService.getUserBoards().subscribe(userBoards => { this.userBoards = userBoards });
  }

  selectBoard(board: BoardData) {
    this.userBoards.forEach(board => { board.last_choosen = false; });

    let index = this.userBoards.indexOf(board);
    this.userBoards.at(index)!.last_choosen = !this.userBoards.at(index)?.last_choosen;
  }

  getIcon(board: BoardData) {
    return this.userBoards.at(this.userBoards.indexOf(board))?.last_choosen == true ? "done" : "close";
  }

}
