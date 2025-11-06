import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventregisterComponent } from './eventregister.component';

describe('EventregisterComponent', () => {
  let component: EventregisterComponent;
  let fixture: ComponentFixture<EventregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
