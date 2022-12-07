import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTimestampComponent } from './delete-timestamp.component';

describe('DeleteTimestampComponent', () => {
  let component: DeleteTimestampComponent;
  let fixture: ComponentFixture<DeleteTimestampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTimestampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTimestampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
