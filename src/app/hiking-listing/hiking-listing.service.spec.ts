import { TestBed } from '@angular/core/testing';

import { HikingTrailsListingService } from './hiking-listing.service';

describe('HikingTrailsListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HikingTrailsListingService = TestBed.get(HikingTrailsListingService);
    expect(service).toBeTruthy();
  });
});
