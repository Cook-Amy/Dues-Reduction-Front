import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarterFinleyComponent } from './carter-finley.component';

describe('CarterFinleyComponent', () => {
  let component: CarterFinleyComponent;
  let fixture: ComponentFixture<CarterFinleyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarterFinleyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarterFinleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
