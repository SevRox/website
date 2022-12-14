import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { filter, map, tap } from 'rxjs';
import { BoardData } from '../structs/boards';
import { UserDataService } from '../user-data.service';
import { DeleteBoardComponent } from '../delete-board/delete-board.component';
import { LocalService } from '../local.service';
import { RegisterBoardComponent } from '../register-board/register-board.component';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

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

  constructor(private authService: NbAuthService, private router: Router, private localStore: LocalService, private userDataService: UserDataService, private menuService: NbMenuService, private windowService: NbWindowService) { }

  ngOnInit(): void {
    this.getUserBoards();

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'settingsMenu'),
      )
      .subscribe((event) => {
        switch (event.item.title) {
          case 'Register':
            this.openRegisterWindow();
            break;
          case 'Delete':
            this.openDeleteWindow();
            break;
          case 'Logout':
            console.log("test");
            this.localStore.removeData("choosenMac");
            this.localStore.saveData("recordToogleState", "false");
            this.router.navigate(['auth/logout']);
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

  registerBoard(board: BoardData) {
    this.userDataService.registerBoard(board);
  }

  selectBoard(board: BoardData) {
    this.userBoards.forEach(board => { board.last_choosen = false; });

    let index = this.userBoards.indexOf(board);
    this.userBoards.at(index)!.last_choosen = !this.userBoards.at(index)?.last_choosen;

    // GlobalConstants.choosenBoardMac = this.userBoards.at(index)!.mac_address;
    this.localStore.saveData("choosenMac", this.userBoards.at(index)!.mac_address);
    console.log(this.localStore.getData("choosenMac"));
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

    windowRef.onClose.subscribe((boradToDelete) => {
      if (boradToDelete !== undefined) {
        this.userDataService.deleteBoard(boradToDelete.mac_address).subscribe(() => {
          this.getUserBoards();
        });
      }
    });
  }

  openRegisterWindow() {
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: false,
      maximize: false,
      fullScreen: false,
      close: true,
    };

    const windowRef = this.windowService.open(RegisterBoardComponent, { title: `Registration`, buttons: buttonsConfig });

    windowRef.onClose.subscribe((boradData) => {
      if (boradData !== undefined) {
        console.log(boradData);
        this.registerBoard(boradData);
        this.getUserBoards();
      }
    });
  }

}
