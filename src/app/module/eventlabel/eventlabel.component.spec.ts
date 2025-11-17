import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventlabelComponent } from './eventlabel.component';

describe('EventlabelComponent', () => {
  let component: EventlabelComponent;
  let fixture: ComponentFixture<EventlabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventlabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
