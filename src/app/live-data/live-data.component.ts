import { Component, OnInit } from '@angular/core';
import { EbikeDataService } from '../ebikedata.service';
import { EbikeData } from '../structs/ebikedata';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { LocalService } from '../local.service';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.scss']
})
export class LiveDataComponent implements OnInit {

  liveData = {} as EbikeData;
  toogleNgRecord = false;
  intervalTime: number = 1500;

  constructor(private ebikedataService: EbikeDataService, private userDataService: UserDataService, private localStore: LocalService, private _router: Router) { }

  getLiveData(): void {
    this.ebikedataService.getLiveData().subscribe(ld => this.liveData = ld);
  }

  startgetLiveDataInterval(): void{
    interval(this.intervalTime).subscribe(() => { 
      this.getLiveData();
    });
  }

  ngOnInit(): void {
    if (this.localStore.getData("choosenMac").length == 0) {
      this.userDataService.getLastchoosenBoardByMac().subscribe((mac: string) => { 
          this.localStore.saveData("choosenMac", mac);
          this.startgetLiveDataInterval();
        })
    }
    else {
      this.startgetLiveDataInterval();
    }

    if (this.localStore.getData("recordToogleState").length != 0) {
      this.toogleNgRecord = (this.localStore.getData("recordToogleState") === "true")
    }
  }

  onSwipeLeft(): void {
    console.log("swiped left");
    this._router.navigateByUrl('/graphs');
  }

  onSwipeRight() {
    console.log("swiped right");
    this._router.navigateByUrl('/settings');
  }

  RecordToogleChange(state: boolean) {
    this.ebikedataService.postRecordToogleState(state);
    this.localStore.saveData("recordToogleState", String(state));
  }
}
