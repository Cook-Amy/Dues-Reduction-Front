import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEditLineComponent } from './single-edit-line.component';

describe('SingleEditLineComponent', () => {
  let component: SingleEditLineComponent;
  let fixture: ComponentFixture<SingleEditLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEditLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEditLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
