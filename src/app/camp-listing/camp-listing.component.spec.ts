import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampListingComponent } from './camp-listing.component';

describe('CampListingComponent', () => {
  let component: CampListingComponent;
  let fixture: ComponentFixture<CampListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
