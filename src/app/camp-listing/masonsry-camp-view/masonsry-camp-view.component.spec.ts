import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonsryCampViewComponent } from './masonsry-camp-view.component';

describe('MasonsryCampViewComponent', () => {
  let component: MasonsryCampViewComponent;
  let fixture: ComponentFixture<MasonsryCampViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonsryCampViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonsryCampViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
