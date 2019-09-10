import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedListingComponent } from './saved-listing.component';

describe('SavedListingComponent', () => {
  let component: SavedListingComponent;
  let fixture: ComponentFixture<SavedListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
