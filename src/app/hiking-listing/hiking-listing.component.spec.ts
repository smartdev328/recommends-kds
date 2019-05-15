import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HikingTrailsListingComponent } from './hiking-listing.component';

describe('HikingTrailsListingComponent', () => {
  let component: HikingTrailsListingComponent;
  let fixture: ComponentFixture<HikingTrailsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HikingTrailsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HikingTrailsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
