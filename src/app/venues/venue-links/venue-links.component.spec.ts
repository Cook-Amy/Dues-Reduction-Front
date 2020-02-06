import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueLinksComponent } from './venue-links.component';

describe('VenueLinksComponent', () => {
  let component: VenueLinksComponent;
  let fixture: ComponentFixture<VenueLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
