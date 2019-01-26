import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeVenueComponent } from './subscribe-venue.component';

describe('SubscribeVenueComponent', () => {
  let component: SubscribeVenueComponent;
  let fixture: ComponentFixture<SubscribeVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeVenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
