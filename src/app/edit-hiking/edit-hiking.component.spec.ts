import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHikingTrailComponent } from './edit-hiking.component';

describe('EditHikingTrailComponent', () => {
  let component: EditHikingTrailComponent;
  let fixture: ComponentFixture<EditHikingTrailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHikingTrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHikingTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
