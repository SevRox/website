import { Component, OnInit } from '@angular/core';
import { NbGlobalLogicalPosition, NbIconConfig, NbToastrService, NbWindowRef } from '@nebular/theme';
import { BoardData } from '../structs/boards';

@Component({
  selector: 'app-register-board',
  templateUrl: './register-board.component.html',
  styleUrls: ['./register-board.component.scss']
})
export class RegisterBoardComponent implements OnInit {
  
  boardData = {} as BoardData;
  inputNameNgModel: string = "";
  inputMacAddressNgModel: string = "";
  nameRegex = /^[a-z ,.'-]+$/i;
  macAddressREgex = /^([0-9A-Fa-f]{2}){6}$/i;

  toastDuration: number = 1000;
  logicalPositions = NbGlobalLogicalPosition;

  constructor(protected windowRef: NbWindowRef, private toastrService: NbToastrService) { }
  
  ngOnInit(): void {
  }

  connectToBoard() {
    throw new Error('Method not implemented.');
  }

  registerBoard() {

    if (!this.nameRegex.test(this.inputNameNgModel)) {
      this.toastrService.show(
      'Wrong name',
        `Error:`,
        { position: this.logicalPositions.BOTTOM_START, limit: 1, icon: ''}
      );
    }
    else if (!this.macAddressREgex.test(this.inputMacAddressNgModel)) {
      this.toastrService.show(
      'Wrong mac address',
        `Error:`,
        {position: this.logicalPositions.BOTTOM_START, limit: 1, icon: ''}
      );
    }
    else {
      this.boardData.is_online = false;
      this.boardData.last_choosen = false;
      this.boardData.name = this.inputNameNgModel;
      this.boardData.mac_address = this.inputMacAddressNgModel;
      this.boardData.user_id = 9;
      
      this.windowRef.close(this.boardData);      
    }

  }

}
