import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueContactsComponent } from './venue-contacts.component';

describe('VenueContactsComponent', () => {
  let component: VenueContactsComponent;
  let fixture: ComponentFixture<VenueContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
