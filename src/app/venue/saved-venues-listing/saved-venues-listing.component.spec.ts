import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedVenuesListingComponent } from './saved-venues-listing.component';

describe('SavedVenuesListingComponent', () => {
  let component: SavedVenuesListingComponent;
  let fixture: ComponentFixture<SavedVenuesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedVenuesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedVenuesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
