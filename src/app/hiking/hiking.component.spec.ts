import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HikingTrailComponent } from './hiking.component';

describe('HikingTrailComponent', () => {
  let component: HikingTrailComponent;
  let fixture: ComponentFixture<HikingTrailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HikingTrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HikingTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
