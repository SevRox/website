import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { filter, map } from 'rxjs';
import { BoardData } from '../structs/boards';
import { UserDataService } from '../user-data.service';
import { DeleteBoardComponent } from '../delete-board/delete-board.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userName: string = "Bartosz Kowalski";
  userBoards: Array<BoardData> = [];

  menuItems: NbMenuItem[] = [
    {
      title: 'Profile',
      children: [
        {
          title: 'Change Password',
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
        },
      ],
    },
    {
      title: 'Boards',
      children: [
        {
          title: 'Register',
        },
        {
          title: 'Delete',
        },
        {
          title: 'Check status',
        },
      ],
    },
  ];

  constructor(private userDataService: UserDataService, private menuService: NbMenuService, private windowService: NbWindowService) { }

  ngOnInit(): void {
    this.getUserBoards();

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'settingsMenu'),
      )
      .subscribe((event) => {
        switch (event.item.title) {
          case 'Delete':
            this.openDeleteWindow();
            break;

          default:
            console.log("default");
            break;
        }
      });
  }

  getUserBoards() {
    this.userDataService.getUserBoards().subscribe(userBoards => { this.userBoards = userBoards });
  }

  deleteBoard(board: BoardData) {
    this.userDataService.deleteBoard(board.mac_address);
  }

  selectBoard(board: BoardData) {
    this.userBoards.forEach(board => { board.last_choosen = false; });

    let index = this.userBoards.indexOf(board);
    this.userBoards.at(index)!.last_choosen = !this.userBoards.at(index)?.last_choosen;
  }

  getIcon(board: BoardData) {
    return this.userBoards.at(this.userBoards.indexOf(board))?.last_choosen == true ? "done" : "close";
  }

  openDeleteWindow() {
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: false,
      maximize: false,
      fullScreen: false,
      close: true,
    };

    const windowRef = this.windowService.open(DeleteBoardComponent, { title: `Warning`, buttons: buttonsConfig });

    windowRef.onClose.subscribe((boradToDelete) => this.deleteBoard(boradToDelete));
  }

}
