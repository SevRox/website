import { TestBed } from '@angular/core/testing';

import { EbikeDataService } from './ebikedata.service';

describe('LivedataService', () => {
  let service: EbikeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbikeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
