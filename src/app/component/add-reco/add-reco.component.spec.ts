import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecoComponent } from './add-reco.component';

describe('AddRecoComponent', () => {
  let component: AddRecoComponent;
  let fixture: ComponentFixture<AddRecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
