import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonsryRecosViewComponent } from './masonsry-recos-view.component';

describe('MasonsryRecosViewComponent', () => {
  let component: MasonsryRecosViewComponent;
  let fixture: ComponentFixture<MasonsryRecosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonsryRecosViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonsryRecosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
