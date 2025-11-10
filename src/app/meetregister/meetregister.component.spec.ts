import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetregisterComponent } from './meetregister.component';

describe('MeetregisterComponent', () => {
  let component: MeetregisterComponent;
  let fixture: ComponentFixture<MeetregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
