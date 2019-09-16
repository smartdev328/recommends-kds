import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonrySubscribeViewComponent } from './masonry-subscribe-view.component';

describe('MasonrySubscribeViewComponent', () => {
  let component: MasonrySubscribeViewComponent;
  let fixture: ComponentFixture<MasonrySubscribeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonrySubscribeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonrySubscribeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
