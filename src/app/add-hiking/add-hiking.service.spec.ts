import { TestBed } from '@angular/core/testing';

import { AddHikingTrailService } from './add-hiking.service';

describe('AddHikingTrailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddHikingTrailService = TestBed.get(AddHikingTrailService);
    expect(service).toBeTruthy();
  });
});
