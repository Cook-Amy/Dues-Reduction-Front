import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalnutCreekComponent } from './walnut-creek.component';

describe('WalnutCreekComponent', () => {
  let component: WalnutCreekComponent;
  let fixture: ComponentFixture<WalnutCreekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalnutCreekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalnutCreekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
