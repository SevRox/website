import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { EbikeDataService } from '../ebikedata.service';
import { BoardData } from '../structs/boards';
import { RecordedDataList } from '../structs/recordedDataList';

@Component({
  selector: 'app-delete-timestamp',
  templateUrl: './delete-timestamp.component.html',
  styleUrls: ['./delete-timestamp.component.scss']
})
export class DeleteTimestampComponent implements OnInit {

  userTimestamps: Array<RecordedDataList> = [];

  constructor(private ebikeDataService: EbikeDataService, protected windowRef: NbWindowRef) { }

  ngOnInit(): void {
    this.getUserTimestamps();
  }

  getUserTimestamps() {
    this.ebikeDataService.getRecordedDataTimestamps().subscribe(timestamps => { this.userTimestamps = timestamps });
  }

  deleteTimestamp(timestamp: RecordedDataList) {
    console.log(timestamp.id);
    this.windowRef.close(timestamp.id);
  }

}
