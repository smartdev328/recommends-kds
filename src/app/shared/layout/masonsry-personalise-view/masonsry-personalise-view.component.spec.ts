import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasonsryVenuesPersonaliseViewComponent } from './masonsry-personalise-view.component';


describe('MasonsryVenuesPersonaliseViewComponent', () => {
  let component: MasonsryVenuesPersonaliseViewComponent;
  let fixture: ComponentFixture<MasonsryVenuesPersonaliseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonsryVenuesPersonaliseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonsryVenuesPersonaliseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
