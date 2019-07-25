import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonsryVenuesViewComponent } from './masonsry-venues-view.component';

describe('MasonsryVenuesViewComponent', () => {
  let component: MasonsryVenuesViewComponent;
  let fixture: ComponentFixture<MasonsryVenuesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonsryVenuesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonsryVenuesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
