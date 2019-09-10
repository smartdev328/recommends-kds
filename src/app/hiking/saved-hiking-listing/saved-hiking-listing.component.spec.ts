import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedHikingListingComponent } from './saved-hiking-listing.component';

describe('SavedHikingListingComponent', () => {
  let component: SavedHikingListingComponent;
  let fixture: ComponentFixture<SavedHikingListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedHikingListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedHikingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
