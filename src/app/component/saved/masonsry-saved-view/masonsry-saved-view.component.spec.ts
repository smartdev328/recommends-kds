import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonsrySavedViewComponent } from './masonsry-saved-view.component';

describe('MasonsrySavedViewComponent', () => {
  let component: MasonsrySavedViewComponent;
  let fixture: ComponentFixture<MasonsrySavedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonsrySavedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonsrySavedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
