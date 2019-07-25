import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonsryViewComponent } from './masonsry-view.component';

describe('MasonsryViewComponent', () => {
  let component: MasonsryViewComponent;
  let fixture: ComponentFixture<MasonsryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonsryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonsryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
