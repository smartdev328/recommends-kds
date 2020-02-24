import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentRecosComponent } from './parent-recos.component';

describe('ParentRecosComponent', () => {
  let component: ParentRecosComponent;
  let fixture: ComponentFixture<ParentRecosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentRecosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentRecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
