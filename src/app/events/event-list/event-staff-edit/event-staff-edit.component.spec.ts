import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStaffEditComponent } from './event-staff-edit.component';

describe('EventStaffEditComponent', () => {
  let component: EventStaffEditComponent;
  let fixture: ComponentFixture<EventStaffEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStaffEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStaffEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
