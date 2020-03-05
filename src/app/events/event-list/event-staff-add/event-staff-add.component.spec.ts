import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStaffAddComponent } from './event-staff-add.component';

describe('EventStaffAddComponent', () => {
  let component: EventStaffAddComponent;
  let fixture: ComponentFixture<EventStaffAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStaffAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStaffAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
