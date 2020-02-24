import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecosListingComponent } from './recos-listing.component';

describe('RecosListingComponent', () => {
  let component: RecosListingComponent;
  let fixture: ComponentFixture<RecosListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecosListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecosListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
