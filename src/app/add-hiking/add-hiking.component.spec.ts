import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHikingTrailComponent } from './add-hiking.component';

describe('AddHikingTrailComponent', () => {
  let component: AddHikingTrailComponent;
  let fixture: ComponentFixture<AddHikingTrailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHikingTrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHikingTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
