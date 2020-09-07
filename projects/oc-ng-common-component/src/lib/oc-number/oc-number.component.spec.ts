import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcNumberComponent} from './oc-number.component';

describe('OcNumberComponent', () => {
  let component: OcNumberComponent;
  let fixture: ComponentFixture<OcNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcNumberComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
