import { Component, OnInit } from '@angular/core';
import { LivedataService } from '../livedata.service';
import { EbikeData } from '../structs/ebikedata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.scss']
})
export class LiveDataComponent implements OnInit {

  constructor(private livedataService: LivedataService, private _router: Router) { }

  liveData = {} as EbikeData;

  getLiveData(): void{
    this.livedataService.getLiveData().subscribe(ld => this.liveData = ld);
    // this.liveData = this.livedataService.getLiveData();    
  }

  ngOnInit(): void {
    this.getLiveData();
  }

  onSwipeLeft(): void {
    console.log("swiped left");
    this._router.navigateByUrl('/graphs');
  }

  onSwipeRight() {
    console.log("swiped right");
    this._router.navigateByUrl('/settings');
  }

}
