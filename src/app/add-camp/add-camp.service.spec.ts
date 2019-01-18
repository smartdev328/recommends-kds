import { TestBed } from '@angular/core/testing';

import { AddCampService } from './add-camp.service';

describe('AddCampService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddCampService = TestBed.get(AddCampService);
    expect(service).toBeTruthy();
  });
});
