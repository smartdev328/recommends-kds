import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonsryHikingTrailViewComponent } from './masonry-hiking-view.component';

describe('MasonsryHikingTrailViewComponent', () => {
  let component: MasonsryHikingTrailViewComponent;
  let fixture: ComponentFixture<MasonsryHikingTrailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonsryHikingTrailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonsryHikingTrailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
