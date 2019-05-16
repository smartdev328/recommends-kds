import { TestBed } from '@angular/core/testing';

import { HikingTrailService } from './hiking.service';

describe('HikingTrailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HikingTrailService = TestBed.get(HikingTrailService);
    expect(service).toBeTruthy();
  });
});
