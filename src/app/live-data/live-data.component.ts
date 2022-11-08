import { Component, OnInit } from '@angular/core';
import { LivedataService } from '../livedata.service';
import { EbikeData } from '../structs/ebikedata';

@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.scss']
})
export class LiveDataComponent implements OnInit {

  constructor(private livedataService: LivedataService) { }

  liveData = {} as EbikeData;

  getLiveData(): void{
    this.livedataService.getLiveData().subscribe(ld => this.liveData = ld);
    // this.liveData = this.livedataService.getLiveData();    
  }

  ngOnInit(): void {
    this.getLiveData();
  }

}
