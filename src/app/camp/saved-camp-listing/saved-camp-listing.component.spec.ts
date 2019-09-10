import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCampListingComponent } from './saved-camp-listing.component';

describe('SavedCampListingComponent', () => {
  let component: SavedCampListingComponent;
  let fixture: ComponentFixture<SavedCampListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedCampListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCampListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
