import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueListingComponent } from './venue-listing.component';

describe('VenueListingComponent', () => {
  let component: VenueListingComponent;
  let fixture: ComponentFixture<VenueListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
