import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEventListingComponent } from './saved-event-listing.component';

describe('SavedEventListingComponent', () => {
  let component: SavedEventListingComponent;
  let fixture: ComponentFixture<SavedEventListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedEventListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedEventListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
